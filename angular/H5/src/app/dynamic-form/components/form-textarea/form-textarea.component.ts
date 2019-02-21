import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.css']
})
export class FormTextareaComponent implements OnInit {

  config: any;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  setValue(){
    sessionStorage[this.config.controlKey]=this.config.value;
  }

}
