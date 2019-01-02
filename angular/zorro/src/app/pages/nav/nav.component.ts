import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {
  openMap = {
    sub1: true,
    sub2: false,
    sub3: false
  };

  constructor() { }

  openHandler(value: string): void {
    // for (const key in this.openMap) {
    //   if (key !== value) {
    //     this.openMap[ key ] = false;
    //   }
    // }
  }
  ngOnInit() {
  }

}
