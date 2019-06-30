import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import resource from '../../layout/resource/resource';

@Injectable()
export class MenuLoadService {
    constructor(
        private http: HttpClient,
        private injector: Injector
    ) { }
    getSettings() {
        console.log('start')
        this.http.get("api/peak-resource/api/resource/user/permission")
            .toPromise()
            .then((res: any) => {
                resource.ResourceItems = res.data.resource;
                resource.menu = res.data.menu;
                console.log('over')
                resource.over = true;//防止由于接口反悔过慢导致权限判定逻辑失败
                this.redirectPlatform()
            });
        this.http.get("api/peak-resource/v1/resource/user/info")
            .toPromise()
            .then((res: any) => {
                resource.currentUser = res.data
            });
        this.http.get("api/peak-resource/v1/resource/apps/permission")
            .toPromise()
            .then((res: any) => {
                resource.navOver = true;//防止由于接口反悔过慢导致其他平台导航获取失败
                resource.nav = res.data
            })
    }

    // getSettings(): Promise<any> {
    //     const promise = this.http.get("api/peak-resource/api/resource/user/permission")
    //         .toPromise()
    //         .then((res: any) => {
    //             resource.ResourceItems = res.data.resource;
    //             resource.menu = res.data.menu;
    //             resource.loaded = true
    //             this.redirectPlatform()
    //             return res;
    //         })
    //     return promise;
    // }

    redirectPlatform() {
        const router = this.injector.get(Router)
        let links = this.getLinks()
        if (links.length === 0) {
            this.getAppsPermission().then(res => {
                let data = res['data']
                for (let i in data) {
                    if (data.appId === '97a78cc5-2e92-42b8-9a7a-de4a6ad5a3b8') {
                        location.href = data.appAddress + '/platform-select'
                        return
                    }
                }
            })
        } else {
            let pathName = location.pathname
            if (pathName === '/') router.navigate([links[0].url])
            else {
                for (let i in links) {
                    if (links[i] === pathName) {
                        router.navigate([links[i].url])
                        return
                    }
                }
                let config = router.config
                for (let i in config) {
                    if (config[i].path === pathName) {
                        alert('没有权限')
                        return
                    }
                    if (config[i].children) {
                        let children = config[i].children
                        for (let j in children) {
                            if (children[j].path === pathName) {
                                alert('没有权限')
                                return
                            }
                        }
                    }
                }
            }
        }
    }

    getAppsPermission() {
        return this.http.get('/api/peak-resource/v1/resource/apps/permission').toPromise()
    }
    getLinks() {
        let menu = resource.menu
        let arr = []
        for (let i in menu) {
            if (menu[i].type === 'link') {
                arr.push(menu[i])
                continue
            } else {
                if (menu[i].children) {
                    let children = menu[i].children
                    for (let j in children) {
                        if (children[j].type === 'link') {
                            arr.push(children[j])
                        }
                    }
                }
            }
        }
        return arr
    }

}
