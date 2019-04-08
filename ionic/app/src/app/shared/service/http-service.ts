import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class selfHttp {
    public api = '/api';
    public http;
    public header = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
        Http: HttpClient,
    ) {
        this.http = Http;
    }

    getToken() {
        if (JSON.parse(localStorage.getItem('token'))) {
            return JSON.parse(localStorage.getItem('token'))
        } else {
            return ''
        }
    }

    public login(url, data: Object, cb?: Function) {
        const that = this;
        that.http.post(that.api + url, data, { headers: that.header })
            .subscribe(res => {
                cb(res);
            });
    }

    public get(url, cb?: Function) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.get(that.api + url, { headers: header })
            .subscribe(data => {
                cb(data);
            });
    }

    public post(url, data: Object, cb?: Function) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.post(that.api + url, data, { headers: header })
            .subscribe(res => {
                cb(res);
            });
    }

    public patch(url, data: Object, cb?: Function) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.patch(that.api + url, data, { headers: header })
            .subscribe(res => {
                cb(res);
            });
    }

    public put(url, data: Object, cb?: Function) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.put(that.api + url, data, { headers: header })
            .subscribe(res => {
                cb(res);
            });
    }

    public delete(url, cb?: Function) {
        const that = this;
        let header = that.header.set('Authorization', that.getToken())
        that.http.delete(that.api + url, { headers: header })
            .subscribe(data => {
                cb(data);
            });
    }
}