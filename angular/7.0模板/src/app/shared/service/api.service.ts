import { Injectable } from '@angular/core';
import { HttpService } from './http-service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    public baseUrl = '/api/';
    // public baseUrl = '/api/jinritb-provider/';
    constructor(
        private http: HttpService
    ) { }

    // 登录条，头部和底部
    public getSystemSetting(params) {//根据key获取系统设置对应信息
        let url = this.baseUrl + 'systemSetting';
        return this.http.get(url, params);
    }
    public getDictionaryItemKey(key) {//根据key获取字典项对应信息
        let url = this.baseUrl + 'dictionary/item/' + key
        return this.http.get(url);
    }
}
