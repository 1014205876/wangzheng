import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import resource from './../../layout/menu-items/resource';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MenuLoadService {

  constructor(private http: Http) { }
  getSettings(){}
//     getSettings(): Promise<any> {
//     const promise = this.http.get("api/peak-resource/api/resource/user/permission")//线上8040
//       .map(res => res.json()).toPromise().then(res => {
//         resource.ResourceItems = res.data.resource;
//         resource.menu = res.data.menu;
//         return res;
//       })
//     return promise;
//   }

}
