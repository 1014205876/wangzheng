import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.less']
})
export class FormRadioComponent implements OnInit {

  config: any;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
    this.config.options.map(e=>{
      if(e.checked){
        this.group.controls[this.config.id].setValue(e.value)
      }
    })
  }

}
