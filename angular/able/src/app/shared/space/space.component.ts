import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpaceComponent implements OnInit {

  arr=[];
  @Input()
    set length(value: number) {
      this.arr=[];
      for(var i=0; i<value-1; i++) {
        this.arr[i]=i;
      }
    };

  

  constructor() { }

  ngOnInit() {
    
  }
  

}
