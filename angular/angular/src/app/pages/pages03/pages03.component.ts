import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages03',
  templateUrl: './pages03.component.html',
  styleUrls: ['./pages03.component.css']
})
export class Pages03Component implements OnInit {

  private msg: string;
  constructor() { }

  ngOnInit() {
  }
  jieshou(msg: string) {
    this.msg = msg
  }
}
