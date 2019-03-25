import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class selfHttp {
    public api='/api';
    public http;
    public header = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
        Http: HttpClient,
    ) {
        this.http = Http;
    }

    getToken() {
        return JSON.parse(localStorage.getItem('token'))
    }

    public login(url, data: Object, cb?: Function, options?: Object) {
        const that = this;
        that.http.post(that.api + url, data, { headers: that.header })
            .subscribe(res => {
                cb(res);
            });
    }

    public get(url, cb?: Function, options?: Object) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.get(that.api + url, { headers: header })
            .subscribe(data => {
                cb(data);
            });
    }

    public post(url, data: Object, cb?: Function, options?: Object) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.post(that.api + url, data, { headers: header })
            .subscribe(res => {
                cb(res);
            });
    }

    public patch(url, data: Object, cb?: Function, options?: Object) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.patch(that.api + url, data, { headers: that.header })
            .subscribe(res => {
                cb(res);
            });
    }

    public put(url, data: Object, cb?: Function, options?: Object) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.put(that.api + url, data, { headers: that.header })
            .subscribe(res => {
                cb(res);
            });
    }

    public delete(url, cb?: Function, options?: Object) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.delete(that.api + url, { headers: that.header })
            .subscribe(data => {
                cb(data);
            });
    }
}