import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import { HttpInterceptorService } from 'ng-http-interceptor';

@Injectable()
export class HttpServe {

  api: String = "/api/";
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http,
    private httpInterceptor: HttpInterceptorService
  ) {
    this.httpInterceptor.request().addInterceptor((data, method) => {
      return data;
    });
  }

  put(url: string, data: any): Promise<any> {
    return new Promise((resole, reject) => {
      this.http.put(this.api + url, data, { headers: this.headers }).map(res => res.json()).subscribe(
        (res: any) => {
          if ((!res.code)||res.code == '200') {
            resole(res.data?res.data:res);
          }
          else {
            reject(res.reason);
          }
        },
        (error) => {
          reject(error.statusText);
        });
    });
  }

  delete(url: string): Promise<any> {
    return new Promise((resole, reject) => {
      this.http.delete(this.api + url, { headers: this.headers }).map(res => res.json()).subscribe(
        (res: any) => {
          if ((!res.code)||res.code == '200') {
            resole(res.data?res.data:res);
          }
          else {
            reject(res.reason);
          }
        },
        (error) => {
          reject(error.statusText);
        });
    });
  }

  post(url: string, data: any): Promise<any> {
    return new Promise((resole, reject) => {
      this.http.post(this.api + url, data, { headers: this.headers }).map(res => res.json()).subscribe(
        (res: any) => {
          if ((!res.code)||res.code == '200') {
            resole(res.data?res.data:res);
          }
          else {
            reject(res.reason);
          }
        },
        (error) => {
          reject(error.statusText);
        });
    });
  }

  get(url: string): Promise<any> {
    return new Promise((resole, reject) => {
      this.http.get(this.api + url, { headers: this.headers }).map(res => res.json()).subscribe(
        (res: any) => {
          if ((!res.code)||res.code == '200') {
            resole(res.data?res.data:res);
          }
          else if(res.reason) {
            reject(res.reason);
          }
        },
        (error) => {
          reject(error.statusText);
        });
    })
  }

  getApiNull(url: string): Promise<any> {
    return new Promise((resole, reject) => {
      this.http.get(url, { headers: this.headers }).map(res => res.json()).subscribe(
        (res: any) => {
          if ((!res.code)||res.code == '200') {
            resole(res.data?res.data:res);
          }
          else {
            reject(res.reason);
          }
        },
        (error) => {
          reject(error.statusText);
        });
    })
  }

  patch(url: string, data: any): Promise<any> {
    return new Promise((resole, reject) => {
      this.http.patch(this.api + url, data, { headers: this.headers }).map(res => res.json()).subscribe(
        (res: any) => {
          if ((!res.code)||res.code == '200') {
            resole(res.data?res.data:res);
          }
          else {
            reject(res.reason);
          }
        }, (error) => {
          reject(error.statusText)
        });
    })
  }
}

