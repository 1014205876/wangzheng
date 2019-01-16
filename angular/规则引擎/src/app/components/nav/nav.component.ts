import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import resource from '../../layout/menu-items/resource';
import { HttpServe } from '../../layout/service/http-serve.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: [
    './nav.component.less',
    '../../../assets/icon/iconfont.css'
  ]
})
export class NavComponent implements OnInit {
  nav: any = {
    menu: [
      // {
      //   icon: "icon iconfont icon-itemManage",
      //   name: "项目管理",
      //   state: "project",
      //   type: "link",
      //   url: "/index",
      // }, {
      //   icon: "icon iconfont icon-renwu",
      //   name: "巡检任务",
      //   state: "task",
      //   type: "link",
      //   url: "/app/task",
      // }
    ]
  };
  nowindex: number;
  constructor(
    private http: HttpServe,
  ) { }
  openChange(index: number) {
    this.nowindex = index;
  }
  ngOnInit() {
    //左导航栏导航
    this.http.getCustomHeaders("/peak-resource/api/resource/user/permission").subscribe(res => {
      console.log(res);
      this.nav = res.result
      resource.ResourceItems = res.result.resource;
      resource.menu = res.result.menu;
    })
  }

}
