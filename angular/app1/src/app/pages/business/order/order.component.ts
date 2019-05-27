import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../shared/service/http-serve.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { TransformService } from './../../../shared/service/transform.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {

  breadcrumbs = ['业务管理', '订单管理'];

  public searchItems;
  public rows = [];
  page = {
    "total": 0,         //总条数
    "totalPage": 1,     //总页数
    "pageNum": 1,        //当前页码
    "pageSize": 10      //每页展示多少条数据
  }
  date;
  loading=false;

  constructor(
    private http: HttpServe,
    private transformServe: TransformService,
    private message: NzMessageService
  ) {
    this.reset();
    this.search(1);
  }

  ngOnInit() { }

  search(pageNum) {
    this.loading=true;
    this.http.get(
      'guest-manage/v1/app/back/loansGrid?regMobile='
      + encodeURIComponent(this.searchItems.regMobile ? this.searchItems.regMobile : '')
      + "&no=" + encodeURIComponent(this.searchItems.no ? this.searchItems.no : '')
      + "&etpName=" + encodeURIComponent(this.searchItems.etpName ? this.searchItems.etpName : '')
      + "&createStartDate=" + encodeURIComponent(this.searchItems.createStartDate ? this.searchItems.createStartDate : '')
      + "&createEndDate=" + encodeURIComponent(this.searchItems.createEndDate ? this.searchItems.createEndDate : '')
      + "&minTerm=" + encodeURIComponent(this.searchItems.minTerm ? this.searchItems.minTerm : '')
      + "&maxTerm=" + encodeURIComponent(this.searchItems.maxTerm ? this.searchItems.maxTerm : '')
      + "&status=" + encodeURIComponent(this.searchItems.status ? this.searchItems.status : '')
      + '&pageNum=' + (pageNum ? pageNum : 1) + '&pageSize='+10
    ).then(data => {
      this.rows = data.list;
      this.page.total = data.total;
      this.page.pageNum = data.pageNum;
      this.page.totalPage = data.pages;
      this.loading=false;
    }, (error) => { error ? this.message.create('error', error) : '';this.loading=false; })
  }

  changePage(pageNum) {
    this.search(pageNum);
  }
  reset() {
    this.date = null;
    this.searchItems = new SearchItems();
  }
  regDateChange(result: Date): void {
    this.searchItems.regStartDate = this.transformServe.dateTransform(result[0]);
    this.searchItems.regEndDate = this.transformServe.dateTransform(result[1]);
  }

}
class SearchItems {
  constructor(
    public nickName?: String,
    public etpName?: String,
    public no?: String,
    public status?: String,
    public createStartDate?: Date,
    public createEndDate?: Date,
    public minTerm?: String,
    public maxTerm?: String,
    public id?: String
  ) { }
}
