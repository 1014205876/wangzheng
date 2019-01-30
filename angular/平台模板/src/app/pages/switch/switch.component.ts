import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {

  dataSet1 = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      status: true,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      status: true,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      status: true,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  dataSet2 = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      status: false,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      status: true,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      status: true,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  switchValue = false;
  loading = false;

  constructor() { }

  clickSwitch(data): void {
    let that=this;
    data.loading = true;
    setTimeout(() => {
      that.dataSet1=that.dataSet2;
      data.loading = false;
    }, 1000);
  }

  ngOnInit() {
  }

}
