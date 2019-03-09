import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-date-time',
  templateUrl: './form-date-time.component.html',
  styleUrls: ['./form-date-time.component.css']
})
export class FormDateTimeComponent implements OnInit {

  config: any;
  group: FormGroup;
  day = '';
  time = '';
  newdate = ''
  pageState;

  constructor(private activatedroute: ActivatedRoute) {

    this.activatedroute.queryParams.subscribe(e => {
      this.pageState = e;
    })
  }

  ngOnInit() {
    this.timechange()
  }

  timechange() {//监听
    let that = this;
    if (that.config.value) {
      let newvalue = "";
      let stopTime = new Date(that.config.value.replace(/-/g, "/")).getTime();
      let date: any = new Date(stopTime);
      let year: any = date.getFullYear();
      let month: any = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      console.log(hour)
      if (hour <= 12) {
        newvalue = year + "-" + month + "-" + day + " " + "AM";
      } else {
        newvalue = year + "-" + month + "-" + day + " " + "PM";
      }
      console.log(newvalue)
      that.newdate = newvalue;
      sessionStorage[this.config.controlKey]=this.config.value;
    }
  }
  
}

