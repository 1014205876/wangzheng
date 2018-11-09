import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages02',
  templateUrl: './pages02.component.html',
  styleUrls: ['./pages02.component.css']
})
export class Pages02Component implements OnInit {
  heroes = [
    { name: '导航1', url: '/pages2/nav01' },
    { name: '导航2', url: '/pages2/nav02' },
    { name: '导航3', url: '/pages2/nav03' },
  ];
  private list: object;
  private show: boolean;
  constructor() { }

  tiaozhuan(url) {
    console.log(`跳转路径为${url}`)
  }
  ngOnInit() {
    this.show = true;
    this.list = [
      1, 2, 3, 4, 5, 6, 7
    ]
  }
}
