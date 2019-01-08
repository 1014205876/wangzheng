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

  tableData = [
    {
      key    : '1',
      name   : 'John Brown',
      age    : 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key    : '2',
      name   : 'Jim Green',
      age    : 42,
      address: 'London No. 1 Lake Park',
    }, {
      key    : '3',
      name   : 'Joe Black',
      age    : 32,
      address: 'Sidney No. 1 Lake Park',
    }
  ];


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
