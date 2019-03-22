import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class selfHttp {
    public restServer;
    public http;
    public header = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
        Http: HttpClient,
    ) {
        this.http = Http;
        this.restServer = '/api';
    }

    getToken() {
        return JSON.parse(localStorage.getItem('token'))
    }

    public login(url, data: Object, cb?: Function, options?: Object) {
        const that = this;
        that.http.post(that.restServer + url, data, { header: that.header })
            .subscribe(res => {
                cb(res);
            });
    }

    public get(url, cb?: Function, options?: Object) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.get(that.restServer + url, { header: header })
            .subscribe(data => {
                cb(data);
            });
    }

    public post(url, data: Object, cb?: Function, options?: Object) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.post(that.restServer + url, data, { header: that.header })
            .subscribe(res => {
                cb(res);
            });
    }

    public patch(url, data: Object, cb?: Function, options?: Object) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.patch(that.restServer + url, data, { header: that.header })
            .subscribe(res => {
                cb(res);
            });
    }

    public put(url, data: Object, cb?: Function, options?: Object) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.put(that.restServer + url, data, { header: that.header })
            .subscribe(res => {
                cb(res);
            });
    }

    public delete(url, cb?: Function, options?: Object) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.delete(that.restServer + url, { header: that.header })
            .subscribe(data => {
                cb(data);
            });
    }
}