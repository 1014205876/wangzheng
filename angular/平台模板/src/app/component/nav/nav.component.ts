import { Component, OnInit } from '@angular/core';
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
      {
        icon: "icon iconfont icon-itemManage",
        name: "首页",
        state: "project",
        type: "link",
        url: "/home",
      },
      {
        icon: "icon iconfont icon-itemManage",
        name: "模块",
        state: "",
        type: "sub",
        url: "",
        children: [
          {
            name: "当前流程",
            state: "curFlow",
            type: "link",
            url: "/model",
          },
          {
            name: "form",
            state: "curFlow",
            type: "link",
            url: "/form",
          },
          {
            name: "switch",
            state: "curFlow",
            type: "link",
            url: "/switch",
          },
        ]
      },
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
      // this.nav = res.result
      // resource.ResourceItems = res.result.resource;
      // resource.menu = res.result.menu;
    })
  }

}
