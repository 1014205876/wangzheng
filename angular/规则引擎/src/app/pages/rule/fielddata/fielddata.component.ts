import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fielddata',
  templateUrl: './fielddata.component.html',
  styleUrls: ['./fielddata.component.css']
})
export class FielddataComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }
  findForm: FormGroup;




  pagechange(num) {
    console.log(num)
  }
  ngOnInit() {
    let that = this;
    that.findForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

}
