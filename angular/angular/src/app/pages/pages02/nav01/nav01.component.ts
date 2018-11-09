import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav01',
  templateUrl: './nav01.component.html',
  styleUrls: ['./nav01.component.less']
})
export class Nav01Component implements OnInit {
  //声明变量的类型
  data = {
    class: [
      { name: 'class1' },
      { name: 'class2' },
      { name: 'class3' },
    ]
  }
  input = '12344'
  constructor() { }

  ngOnInit() {
  }

}
