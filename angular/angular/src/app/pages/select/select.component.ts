import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  constructor() { }

  form = [
    {
      type:'one',
      option: [
        {
          name: '选项一',
          value: 'one'
        }
      ],
      value:''
    }
  ]
  ngOnInit() {
  }

}
