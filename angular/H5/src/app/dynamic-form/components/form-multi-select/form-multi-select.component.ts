import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-multi-select',
  templateUrl: './form-multi-select.component.html',
  styleUrls: ['./form-multi-select.component.css']
})
export class FormMultiSelectComponent implements OnInit {

  config: any;
  group: FormGroup;

  show=false;
  selectItem=[];

  constructor() { }

  ngOnInit() {
  }

  select(e){
    console.log(e)
    this.selectItem.push(e.value);
  }
  selectSure(){
    this.config.value=this.selectItem;
    sessionStorage[this.config.controlKey]=this.config.value;
  }
}
