import { Injectable } from '@angular/core';
import { HttpService } from './http-service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public baseUrl = '/api/';
    public nodeUrl = '/node/';
    constructor(
        private http: HttpService
    ) { }

    public ports(num?) {//根据key获取系统设置对应信息
        let url = this.baseUrl + '/users' + (num ? ('/' + num) : '');
        return this.http.get(url, {}, true);
    }
    public users() {//根据key获取系统设置对应信息
        let url = this.nodeUrl + '/users';
        return this.http.get(url, {}, true);
    }

    public register(data) {//根据key获取系统设置对应信息
        let url = this.nodeUrl + '/register';
        return this.http.post(url, data, true);
    }
}
