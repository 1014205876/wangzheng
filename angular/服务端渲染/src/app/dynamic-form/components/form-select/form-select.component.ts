import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.less']
})
export class FormSelectComponent implements OnInit {

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
