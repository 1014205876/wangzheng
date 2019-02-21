import { DateTransformService } from './../../../shared/service/date-transform.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.css']
})
export class FormDateComponent implements OnInit {

  config: any;
  group: FormGroup;

  show=false;

  today=new Date();
  value;
  en;

  constructor(private dateTransform:DateTransformService) { }

  ngOnInit() {
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
    // this.today.setDate(this.today.getDate()+1);
    this.value=this.today;
    this.today=new Date();
  }

  sure() {
    if (this.value) {
      let date = this.value;
      this.config.value=this.dateTransform.transform(date)
      sessionStorage[this.config.controlKey]=this.config.value;
    }
  }

}
