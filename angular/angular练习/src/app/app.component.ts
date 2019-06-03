import { Component, OnInit } from '@angular/core';

import { Consol } from './console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title: string;
  private show: boolean;
  private message: string;
  private msg: string;
  constructor(private logger: Consol) { }
  ngOnInit() {
    this.title = 'wang';
    this.show = true;
    this.logger.debug('你好')
    this.message = '来自父组件'
    console.log(this)
  }
  jieshou(msg) {
    this.msg = msg
  }
}
