import { Component, OnInit } from '@angular/core';
import resource from "../menu-items/resource";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: [
        './menu.component.less'
    ]
})
export class MenuComponent implements OnInit {

    nowindex: number;
    menu = [
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
                    url: "/echart",
                },
                {
                    name: "model",
                    state: "curFlow",
                    type: "link",
                    url: "/model",
                },
                {
                    name: "table",
                    state: "curFlow",
                    type: "link",
                    url: "/table",
                },
            ]
        },
    ];
    constructor() {
    }
    openChange(index: number) {
        this.nowindex = index;
    }
    ngOnInit() { }

}
