import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-service';

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
                    {
                        name: "switch",
                        state: "curFlow",
                        type: "link",
                        url: "/swiper",
                    },
                    {
                        name: "three",
                        state: "curFlow",
                        type: "link",
                        url: "/three",
                    },
                    {
                        name: "upload",
                        state: "curFlow",
                        type: "link",
                        url: "/module/upload",
                    },
                ]
            },
        ]
    };
    nowindex: number;
    constructor(
        private http: HttpService,
    ) { }
    openChange(index: number) {
        this.nowindex = index;
    }
    ngOnInit() {
        //左导航栏导航
        this.http.get('peak-resource/api/resource/user/permission', res => {
            console.log(res);
            // this.nav.menu = res.result.menu;
        });
    }
}
