
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie';
import { HttpInterceptorService } from 'ng-http-interceptor';
import { Router } from '@angular/router';
import global from '../global';
@Injectable()
export class HttpService {

  private api: String = "/api/guest-client";
  private api2: String = "/api";
  constructor(private http: Http, private auth: AuthService,
    private cookie: CookieService,
    private route: Router,
    private httpInterceptor: HttpInterceptorService) {
    this.httpInterceptor.request().addInterceptor((data, method) => {
      return data;
    });

    this.httpInterceptor.response().addInterceptor(res => res.do(null, e => {
      if (e.status == 403) {
        this.cookie.remove("Template");
        this.route.navigate(['/login']);
      }
      return res;
    }));
  }

  get(url: string) {
    let headers: Headers = new Headers({ 'AUTH_USER': this.auth.getAuthorization("Template"), 'Content-Type': 'application/json' })
    return this.http.get(this.api + url, { headers: headers })
      .map(res => res.json())
  }
  getw(url: string) {
    let headers: Headers = new Headers({ 'AUTH_USER': this.auth.getAuthorization("Template"), 'Content-Type': 'application/json' })
    return this.http.get(this.api2 + url, { headers: headers })
      .map(res => res.json())
  }
  get2(url: string) {
    let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.get(this.api + url, { headers: headers })
      .map(res => res.json())
  }

  // get(url: string) {
  //   let headers: Headers = new Headers({ 'AUTH_USER': '15770696660', 'Content-Type': 'application/json'})
  //   return this.http.get(this.api+url, { headers: headers })
  //     .map(res => res.json())
  // }

  post(url: string, data: any) {
    let headers: Headers = new Headers({ 'AUTH_USER': this.auth.getAuthorization("Template"), 'Content-Type': 'application/json' })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.post(this.api + url, data, { headers: headers })
      .map(res => res.json())
  }


  put(url: string, data?: any) {
    let headers: Headers = new Headers({ 'AUTH_USER': this.auth.getAuthorization("Template"), 'Content-Type': 'application/json' })
    return this.http.put(this.api + url, data, { headers: headers })
      .map(res => res.json());
  }
  
  patch(url: string, data?: any) {
    let headers: Headers = new Headers({ 'AUTH_USER': this.auth.getAuthorization("Template"), 'Content-Type': 'application/json' })
    return this.http.patch(this.api + url, data, { headers: headers })
      .map(res => res.json());
  }

  delete(url: string) {
    let headers: Headers = new Headers({ 'AUTH_USER': this.auth.getAuthorization("Template"), 'Content-Type': 'application/json' })
    // let headers: Headers = new Headers({ 'Content-Type': 'application/json' })
    return this.http.delete(this.api + url, { headers: headers });
  }
}