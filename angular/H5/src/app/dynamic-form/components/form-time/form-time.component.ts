import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-time',
  templateUrl: './form-time.component.html',
  styleUrls: ['./form-time.component.css']
})
export class FormTimeComponent implements OnInit {

  config: any;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  setValue(){
    sessionStorage[this.config.controlKey]=this.config.value;
  }

}
