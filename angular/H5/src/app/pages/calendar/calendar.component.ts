import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  dayTime;
  pageState;

  @Output() callBack = new EventEmitter();

  today=new Date();

  en;

  value=new Date();
  time = '08:00:00';

  constructor(private activatedroute: ActivatedRoute, private router: Router) {
    this.activatedroute.queryParams.subscribe(e => {
      this.pageState=e;
      this.dayTime=e.time;
      if(this.dayTime){
        let temp=this.dayTime.split('-')
        let temp2=temp[2].split(' ')

        let yy=temp[0];
        let mm=temp[1];
        let dd=temp2[0];
        this.time=temp2[1];
        this.value.setDate(dd);
        this.value.setMonth(mm-1);
        this.value.setFullYear(yy);
      }else {
        this.reselect();
      }
      
    })
  }

  ngOnInit() {
    sessionStorage.dataInit='0';
    this.en = {
      /** 每周第一天，0代表周日 */
      firstDayOfWeek: 0,
      /** 每周天数正常样式 */
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      /** 每周天数短样式（位置较小时显示） */
      dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      /** 每周天数最小样式 */
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      /** 每月月份正常样式 */
      monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      /**每月月份短样式 */
      monthNamesShort: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    };
  }

  reselect(){
    this.today.setDate(this.today.getDate()+1);
    this.value=this.today;
    this.time='08:00:00';
    this.today=new Date();
  }

  sure() {
    if (this.value) {
      let date = this.value;

      if(date<this.today){
        alert("请选择正确的日期，日期必须是今天之后的日期");
        return;
      }

      let checkedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + this.time;
      sessionStorage.dataInit='0';
      sessionStorage[this.pageState.key]=checkedDate;
      history.back();
    }
  }
}
