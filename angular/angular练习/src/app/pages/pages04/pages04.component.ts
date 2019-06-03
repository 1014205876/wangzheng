import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages04',
  templateUrl: './pages04.component.html',
  styleUrls: ['./pages04.component.css']
})
export class Pages04Component implements OnInit {

  private msg: string;
  constructor() { }

  ngOnInit() {
  }
  jieshou(msg: string) {
    this.msg = msg
  }

}
