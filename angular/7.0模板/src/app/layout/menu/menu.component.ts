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
                name: "模块",
                state: "",
                type: "sub",
                url: "",
                children: [
                    {
                        name: "form",
                        state: "curFlow",
                        type: "link",
                        url: "/module/form",
                    },
                    {
                        name: "upload",
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
