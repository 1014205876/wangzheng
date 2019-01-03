import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() nav;
  nowindex:number;
  constructor() { }
  openChange(index){
    this.nowindex=index;
  }
  ngOnInit() {
  }

}
