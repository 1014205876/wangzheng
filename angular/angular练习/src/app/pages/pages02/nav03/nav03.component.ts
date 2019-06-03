import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav03',
  templateUrl: './nav03.component.html',
  styleUrls: ['./nav03.component.css']
})
export class Nav03Component implements OnInit {

  table= [//表格的数据
    {
      name: '进件端名称',
      key: 'getCustomerName',
      time: '2018-11-12 12：30：25',
      type: 'textarea',
      value: ''
    },
    {
      name: '进件端名称',
      key: 'getCustomerName',
      time: '2018-11-12 12：30：25',
      type: 'file',
      value: ''
    },
    {
      name: '进件端名称',
      key: 'getCustomerName',
      time: '2018-11-12 12：30：25',
      type: 'editor',
      value: ''
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
