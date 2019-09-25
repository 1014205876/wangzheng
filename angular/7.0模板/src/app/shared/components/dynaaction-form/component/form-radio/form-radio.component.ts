import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.less']
})
export class FormRadioComponent implements OnInit {

    @Input() public form;//表单对象

  constructor() { }

  ngOnInit() {
  }

}
