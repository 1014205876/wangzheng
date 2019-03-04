import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
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
                name: "图表",
                state: "curFlow",
                type: "link",
                url: "/module/echart",
              },
              {
                name: "form",
                state: "curFlow",
                type: "link",
                url: "/module/form",
              },
            //   {
            //     name: "switch",
            //     state: "curFlow",
            //     type: "link",
            //     url: "/module/switch",
            //   },
            ]
          },
        ]
      };
      nowindex: number;
      constructor(
        private http: HttpClient,
      ) { }
      openChange(index: number) {
        this.nowindex = index;
      }
      ngOnInit() {
        //左导航栏导航
        this.http.get("/api/peak-resource/api/resource/user/permission").subscribe(res => {
          console.log(res);
          // this.nav = res.result
          // resource.ResourceItems = res.result.resource;
          // resource.menu = res.result.menu;
        })
      }
}
