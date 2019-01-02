import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import { HttpInterceptorService } from 'ng-http-interceptor';

@Injectable()
export class HttpServe {

  api:String="/api/peak-resource/";  //线上8040
  // api:String="/api/";  //吴哥8090

  constructor(
    private http: Http,
    private route: Router,
    private httpInterceptor: HttpInterceptorService
  ) {
    this.httpInterceptor.request().addInterceptor((data, method) => {
      return data;
    });
  }

  // .set('AUTH_ID', process.env.AUTH_ID)
        // .set('AUTH_USER',encodeURI(req.session.cas.user))

  getCustomHeaders(url: string) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.get(this.api + url, { headers: headers })
      .map(res => res.json())
  }
  postCustomHeaders(url: string, data: any) {
    // let headers: Headers = new Headers({ "Authorization": this.auth.getAuthorization("Template"), 'Content-Type': 'application/json' })
    let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.api + url, data, { headers: headers })
      .map(res => res.json())
  }
  upload(url: string, data: any) {
    let headers: Headers = new Headers({ 'Content-Type': 'multipart/form-data;charset=utf-8'})
    return this.http.post(this.api + url, data, { headers: headers })
      .map(res => res.json())
  }
  
  uploadCustomHeaders(url: string){
    let headers: Headers = new Headers({ 'Content-Type': 'multipart/form-data;charset=utf-8' })
    return this.http.post( url, { headers: headers })
      .map(res => res.json());
  }
  putCustomHeaders(url: string, data: any) {
    // let headers: Headers = new Headers({ "Authorization": this.auth.getAuthorization("Template"), 'Content-Type': 'application/json' })
    let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.put(this.api + url, data, { headers: headers })
      .map(res => res.json());
  }

  patchCustomHeaders(url: string, data: any) {
    // let headers: Headers = new Headers({ "Authorization": this.auth.getAuthorization("Template"), 'Content-Type': 'application/json' })
    let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.patch(this.api + url, data, { headers: headers })
      .map(res => res.json());
  }

  deleteCustomHeaders(url: string) {
    // let headers: Headers = new Headers({ "Authorization": this.auth.getAuthorization("Template"), 'Content-Type': 'application/json' })
    let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.delete(this.api + url, { headers: headers })
      .map(res => res.json());
  }
}
