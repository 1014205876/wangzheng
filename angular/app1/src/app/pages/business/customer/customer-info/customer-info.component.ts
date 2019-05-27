import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../../shared/service/http-serve.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.less']
})
export class CustomerInfoComponent implements OnInit {

  breadcrumbs = ['业务管理','注册客户管理', '用户详情'];

  info;

  constructor(public activedRoute: ActivatedRoute,private http: HttpServe) {
    this.activedRoute.queryParams.subscribe(res => {
      let id = res.id;
      this.http.get('guest-manage/v1/app/back/users/'+id).then(data => {
        this.info=data;
      })
    })
  }

  ngOnInit() {
  }

}
