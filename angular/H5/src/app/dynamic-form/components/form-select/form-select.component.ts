import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css']
})
export class FormSelectComponent implements OnInit {

  config: any;
  group: FormGroup;

  value;
  selectValue: Item[];
  constructor() { }

  ngOnInit() {
    if(!this.config){
      this.config="";
    }
  }
  setValue(){
    sessionStorage[this.config.controlKey]=this.config.value;
  }
}
interface Item {
  name: string;
  code: string;
}