import { Component, OnInit } from '@angular/core';
import resource from "../menu-items/resource";

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
    menu;
    product;
    constructor() {
        this.menu = resource.menu;
    }
    openChange(index: number) {
        this.childmenuindex = null;
        this.submenuindex = index;
    }
    ngOnInit() { }

}
