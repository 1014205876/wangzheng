import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.less']
})
export class RowComponent implements OnInit {

  @Input() private formData: any;

  constructor() { }

  ngOnInit() {
  }

  deleteCom(arr,index){
    arr.splice(index, 1); 
  }
}
