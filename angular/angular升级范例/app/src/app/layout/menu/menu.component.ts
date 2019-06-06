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

  nowindex:number;
  menu;
  constructor() {
    this.menu=resource.menu;
  }
  openChange(index:number){
    this.nowindex=index;
  }
  ngOnInit() {
    
  }

}
