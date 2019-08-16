import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TransformService } from './../../../shared/service/transform.service';

@Component({
  selector: 'app-form-date-time',
  templateUrl: './form-date-time.component.html',
  styleUrls: ['./form-date-time.component.less']
})
export class FormDateTimeComponent implements OnInit {

  config: any;
  group: FormGroup;

  date;
  time='08:00:00';
  dateTime;
  

  constructor(
    private transform: TransformService
  ) {}

  ngOnInit() {
    if(this.config.value){
      let arr=this.config.value.split(' ');
      this.date=arr[0];
      this.time=arr[1]
    }
  }

  getDay(e){
    if(e){
      this.date=this.transform.dateTransform(e);
      this.getTime(e);
    }else{
      this.group.controls[this.config.id].setValue("");
    }
  }

  getTime(e){
    if(this.date&&this.time){
      this.dateTime=this.date+' '+this.time;
      this.group.controls[this.config.id].setValue(this.dateTime);
    }else {
      this.group.controls[this.config.id].setValue("");
    }
  }
  disabledDate = (current: Date): boolean => {
    let today = new Date();
    // Can not select days before today and today
    if (!current || !today) {
      return false;
    }
    return today.getTime() > current.getTime();
  }
}
