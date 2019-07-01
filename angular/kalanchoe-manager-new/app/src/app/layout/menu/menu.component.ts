import { Component, OnInit } from '@angular/core';
import resource from "../resource/resource";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: [
        './../../../assets/menu/iconfont.css',
        './menu.component.less'
    ]
})
export class MenuComponent implements OnInit {

    submenuindex;
    childmenuindex;
    menu = [];

    constructor(
    ) { }

    openChange(index: number) {
        this.childmenuindex = null;
        this.submenuindex = index;
    }

    getMenu() {
        if (resource.over) {//防止权限接口返回过慢导致获取到的权限数组为空
            this.menu = resource.menu;
        } else {
            setTimeout(() => {
                this.getMenu()
            }, 100);
        }
    }

    ngOnInit() {
        this.getMenu();
    }

}
