import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TransformService } from './../../../shared/service/transform.service';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.less']
})
export class FormDateComponent implements OnInit {

  config: any;
  group: FormGroup;
  value;

  constructor(private transform: TransformService) {}

  ngOnInit() {
    if(this.config.value){
      this.value=this.config.value;
    }
  }
  getDay(e){
    var newD,date;
    if(e){
      newD=new Date(String(e).replace(/-/g, '/'));
      date=this.transform.dateTransform(newD);
    }
    this.group.controls[this.config.id].setValue(date);
  }

  disabledDate = (current: Date): boolean => {
    let today = new Date();
    // Can not select days before today and today
    if (!current || !today) {
      return false;
    }
    return current.getTime() > today.getTime();
  }

}
