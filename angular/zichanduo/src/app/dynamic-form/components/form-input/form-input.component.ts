import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.less']
})
export class FormInputComponent implements OnInit {

  config: any;
  group: FormGroup;

  maxLength;

  constructor() { }

  ngOnInit() {
    if(this.config.params&&this.config.params.hasOwnProperty('maxLength')){
      this.maxLength=this.config.params.maxLength;
    }
  }

}
