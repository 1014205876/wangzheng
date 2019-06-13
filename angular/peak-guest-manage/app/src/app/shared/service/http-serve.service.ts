
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie';
import { HttpInterceptorService } from 'ng-http-interceptor';
import { Router } from '@angular/router';
@Injectable()
export class HttpService {

  api:String="/api/guest-manage";//线上8040接口
  api2:String="/api/";//吴哥7300接口
  loginApi:String='/api'
  constructor(private http: Http, private auth: AuthService,
    private cookie: CookieService,
    private route: Router,
    private httpInterceptor: HttpInterceptorService) {
      this.httpInterceptor.request().addInterceptor((data, method) => {
        return data;
      });
  
      this.httpInterceptor.response().addInterceptor(res => res.do(null, e => {
        if(e.status == 403){
          this.cookie.remove("Template");
          this.route.navigate(['/login']);
        }
        return res;
      }));
  }

  login(url: string, data: any) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.post(this.loginApi + url, data, { headers: headers })
      .map(res => res.json());
  }

  getCustomHeaders2(url: string) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.get(url, { headers: headers })
      .map(res => res.json())
  }

  getCustomHeaders(url: string) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.get(this.api + url, { headers: headers })
      .map(res => res.json())
  }

  getCustomHeaders3(url: string) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.get(this.api2 + url, { headers: headers })
      .map(res => res.json())
  }

  postCustomHeaders(url: string, data: any) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.api + url, data, { headers: headers })
      .map(res => res.json())
  }

  putCustomHeaders(url: string, data: any) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.put(this.api + url, data, { headers: headers })
      .map(res => res.json());
  }

  deleteCustomHeaders(url: string) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.delete(this.api + url, { headers: headers })
    .map(res => res.json());
  }

  patchCustomHeaders(url: string, data: any) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.patch(this.api +url, data, { headers: headers })
      .map(res => res.json());
  }
  
  uploadCustomHeaders(url: string){
    let headers: Headers = new Headers({ 'Content-Type': 'application/json','Authorization':this.auth.getAuthorization('Template1') })
    return this.http.post( url, { headers: headers })
      .map(res => res.json());
  }
}