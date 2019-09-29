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
                name: "首页",
                state: "project",
                type: "link",
                url: "/home",
            },
            {
                name: "登录",
                state: "project",
                type: "link",
                url: "/login",
            },
            {
                name: "练习",
                state: "",
                type: "sub",
                url: "",
                children: [
                    {
                        name: "表单",
                        state: "curFlow",
                        type: "link",
                        url: "/module/form",
                    },
                    {
                        name: "日历",
                        state: "curFlow",
                        type: "link",
                        url: "/module/calendar",
                    },
                    {
                        name: "扫雷",
                        state: "curFlow",
                        type: "link",
                        url: "/module/saolei",
                    },
                    {
                        name: "上传",
                        state: "curFlow",
                        type: "link",
                        url: "/module/upload",
                    },
                ]
            },
            {
                name: "个人中心",
                state: "curFlow",
                type: "link",
                url: "/user-center",
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
    }
}
