import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../shared/service/http-serve/api.service';
import { DateTransformService } from '../../shared/service/date-transform/date-transform.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {

  // 查询字段
  public searchItems;

  // 表格数据
  rows = [];
  page = {
    "total": 1,         //总条数
    "totalPage": 1,     //总页数
    "pageNum": 1,        //当前页码
    "pageSize": 10      //每页展示多少条数据
  }
  loadingDelay = 500;
  loading = true

  constructor(
    private api: ApiService,
    private dateTransform: DateTransformService
  ) {
    this.reset();
  }

  ngOnInit() {
    this.search(this.page.pageNum);
  }

  reset() {
    this.searchItems = new Items();
    this.startValue = null;
    this.endValue = null;
  }

  async search(e) {
    this.page.pageNum = e
    this.searchItems.startDate = this.startValue ? this.dateTransform.transform(this.startValue) : '';
    this.searchItems.endDate = this.endValue ? this.dateTransform.transform(this.endValue) : '';
    let params = {
      startDate: this.searchItems.startDate,
      endDate: this.searchItems.endDate,
      title: this.searchItems.title,
      pageNum: this.page.pageNum,
      pageSize: this.page.pageSize
    }
    let res = await this.api.getLogs(params)
    this.rows = res.list;
    this.page.total = res.total;
    this.page.totalPage = res.pages;
    this.page.pageNum = res.pageNum;
    this.loading = false
  }

  changePage(e) {
    this.search(e);
  }

  startValue: Date = null;
  endValue: Date = null;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  }

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  }

}
class Items {
  constructor(
    public startDate?: Date,
    public endDate?: Date,
    public title?: String
  ) { }
}
