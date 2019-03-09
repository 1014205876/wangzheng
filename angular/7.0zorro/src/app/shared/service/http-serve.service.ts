import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/do';
// import { HttpInterceptorService } from 'ng-http-interceptor';


@Injectable()
export class HttpServe {

    api: String = "/api/";

    constructor(
        // private http: Http,
        // private httpInterceptor: HttpInterceptorService
    ) {
        // this.httpInterceptor.request().addInterceptor((data, method) => {
        //     return data;
        // });
    }

    // put(url: string, data: any) {
    //     let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    //     return this.http.put(this.api + url, data, { headers: headers })
    //         .map(res => res.json());
    // }

    // delete(url: string) {
    //     let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    //     return this.http.delete(this.api + url, { headers: headers })
    //         .map(res => res.json());
    // }

    // post(url: string, data: any) {
    //     let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    //     return this.http.post(this.api + url, data, { headers: headers })
    //         .map(res => res.json())
    // }

    // get(url: string) {
    //     let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    //     return this.http.get(this.api + url, { headers: headers })
    //         .map(res => res.json())
    // }

    // patch(url: string, data: any) {
    //     let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    //     return this.http.patch(this.api + url, data, { headers: headers })
    //         .map(res => res.json());
    // }

}
