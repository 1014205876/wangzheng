import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class selfHttp {
    public restServer;
    public http;
    public header
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })

    constructor(
        Http: HttpClient,
        // header: HttpHandler,
    ) {
        this.http = Http;
        this.restServer = '/api/';
        this.header = new HttpHeaders().set('Content-Type', 'application/json')
    }

    public get(url, cb?: Function, options?: Object) {
        const vm = this;
        vm.http.get(vm.restServer + url, { header: vm.header })
            .subscribe(data => {
                cb(data);
            });
    }

    public post(url, data: Object, cb?: Function, options?: Object) {
        const vm = this;
        vm.http.post(vm.restServer + url, data, { header: vm.header })
            .subscribe(res => {
                cb(res);
            });
    }

    public patch(url, data: Object, cb?: Function, options?: Object) {
        const vm = this;
        vm.http.patch(vm.restServer + url, data, { header: vm.header })
            .subscribe(res => {
                cb(res);
            });
    }

    public put(url, data: Object, cb?: Function, options?: Object) {
        const vm = this;
        vm.http.put(vm.restServer + url, data, { header: vm.header })
            .subscribe(res => {
                cb(res);
            });
    }

    public delete(url, cb?: Function, options?: Object) {
        const vm = this;
        vm.http.delete(vm.restServer + url, { header: vm.header })
            .subscribe(data => {
                cb(data);
            });
    }
}