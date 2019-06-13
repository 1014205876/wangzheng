import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import resource from './resource';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AppLoadService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) {
  }
  // getSettings(){}
  getSettings(): Promise<any> {
    const promise = this.http.get('/api/peak-resource/api/resource/user/permission')//线上8040
    // const promise = this.http.get('192.168.111.216:8040/api/resource/user/permission')//线上8040
    .map(res => res.json()).toPromise().then(res => {
      resource.ResourceItems = res.data.resource;
      resource.menu = res.data.menu;
      JSON.stringify(res);
      return res;
    })
    return promise;
  }

}
