import { Injectable } from '@angular/core';
import { HttpServe } from './http-serve.service'
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public resourceUrl = 'api/peak-resource/v1/resource/';//资源接口
    public managerUrl = 'api/guest-manage/v1/app/back/';//获客接口

    constructor(
        private http: HttpServe
    ) { }
// 四个全局接口
// api/peak-resource/v1/resource/user/pass/admin
// api/guest-manage/v1/resource/pass/admin
    public changePassword(account: any, params: any) {
        let url = this.resourceUrl + 'user/pass/' + account;
        return this.http.patch(url, params)
    }
    // public bannerStatus(id: any, params: any) {
    //     let url = this.baseUrl + 'banners/' + id
    //     return this.http.patch(url, params, true)
    // }
    // public helpsPageGet(params: any) {
    //     let url = this.baseUrl + 'helpsDataGrid'
    //     return this.http.get(url, params, true)
    // }
    // public helpsSave(params: any) {
    //     let url = this.baseUrl + 'help'
    //     return this.http.post(url, params, true)
    // }
    // public helpsDelete(id: any) {
    //     let url = this.baseUrl + 'helps/' + id
    //     return this.http.delete(url, {}, true)
    // }
    // public helpsUpdate(id: any, params: any) {
    //     let url = this.baseUrl + 'helps/' + id
    //     return this.http.put(url, params, true)
    // }
}
