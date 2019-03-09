import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scalable-img',
  templateUrl: './scalable-img.component.html',
  styleUrls: ['./scalable-img.component.css']
})
export class ScalableImgComponent implements OnInit {

  @Input() img;

  hasClick=false;

  constructor() { }

  ngOnInit() {
  }

  noscroll(e){
    e.stopPropagation();
    e.preventDefault();
    // if(this.hasClick){
    //   document.body.style.overflow='hidden';
    // }else{
    //   document.body.style.overflow='';
    // }
  }

}
