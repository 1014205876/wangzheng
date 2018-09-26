import { Component, OnInit } from '@angular/core';
import { HEROES } from '../../data/data';
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  heroes = HEROES;
  constructor() { }
  tiaozhuan(url) {
    console.log(`跳转路径为${url}`)
  }
  ngOnInit() {
    console.log(`初始化成功`)
  }

}
