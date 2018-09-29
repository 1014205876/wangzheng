import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages02',
  templateUrl: './pages02.component.html',
  styleUrls: ['./pages02.component.css']
})
export class Pages02Component implements OnInit {

  private list: object;
  private show: boolean;
  constructor() { }

  ngOnInit() {
    this.show = true;
    this.list = [
      1, 2, 3, 4, 5, 6, 7
    ]
  }
}
