import { Injectable } from '@angular/core';
import { HttpService } from './http-service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public apiUrl = '/api/';
    public nodeUrl = '/node/';
    constructor(
        private http: HttpService
    ) { }

    public getCookie() {//查询登录状态
        let url = this.nodeUrl + 'cookie'
        return this.http.get(url)
    }
    public postLogOut() {//退出登录
        let url = this.nodeUrl + 'loginOut'
        return this.http.post(url)
    }
    public ports(num?) {//
        let url = this.apiUrl + 'user' + (num ? ('/' + num) : '');
        return this.http.get(url);
    }
    public user(data) {//获取用户信息
        let url = this.nodeUrl + 'user';
        return this.http.get(url, data);
    }
    public users(data) {//获取所有用户信息
        let url = this.nodeUrl + 'users';
        return this.http.get(url, data);
    }

    public register(data) {//注册接口
        let url = this.nodeUrl + 'register';
        return this.http.post(url, data);
    }
}
