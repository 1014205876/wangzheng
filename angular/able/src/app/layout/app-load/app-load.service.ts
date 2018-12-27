import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import resource from './../../shared/menu-items/resource';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AppLoadService {

  constructor(
    private http: Http,
    private httpClient: HttpClient
  ) {
  }
  getSettings(): Promise<any> {
    const promise = this.http.get("api/peak-resource/api/resource/user/permission")//线上8040
    // const promise = this.http.get("api/api/resource/user/permission")//吴哥8090
      .map(res => res.json()).toPromise().then(res => {
        resource.ResourceItems = res.result.resource;
        resource.menu = res.result.menu;
        return res;
      })
    return promise;
  }
  // getSettings(){}
}
