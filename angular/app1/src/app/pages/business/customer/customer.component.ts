import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TransformService } from './../../../shared/service/transform.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.less']
})
export class CustomerComponent implements OnInit {

  breadcrumbs = ['业务管理', '注册客户管理'];

  public searchItems;
  regDate;
  public bankList;
  sourceData = ["app", "小程序", "手机网页"]

  public rows = [];
  loading=false;

  page={
    "total":0,         //总条数
    "totalPage":1,     //总页数
    "pageNum":1,        //当前页码
    "pageSize": 10      //每页展示多少条数据
  }

  constructor(
    private http: HttpServe,
    private message: NzMessageService,
    private transformServe: TransformService
  ) {
    this.searchItems = new SearchItems();
    this.searchItems.registSource = '';
    this.searchItems.insName = '';
  }

  ngOnInit() {
    this.search(1);
    this.getBank()
  }

  search(pageNum) {
    this.http.get(
      'guest-manage/v1/app/back/usersGrid?mobile='
      + encodeURIComponent(this.searchItems.mobile ? this.searchItems.mobile : '')
      + '&regStartDate=' + encodeURIComponent(this.searchItems.regStartDate ? this.searchItems.regStartDate : '')
      + '&regEndDate=' + encodeURIComponent(this.searchItems.regEndDate ? this.searchItems.regEndDate : '')
      + '&insName=' + (this.searchItems.insName ? this.searchItems.insName : '')
      + '&registSource=' + (this.searchItems.registSource ? this.searchItems.registSource : '')
      + '&pageNum=' + (pageNum ? pageNum : '1') + '&pageSize=10'
    ).then(data=>{
      this.rows=data.list;
      this.page.total=data.total;
      this.page.pageNum=data.pageNum;
      this.page.totalPage=data.pages;
    }, (error)=>{ error?this.message.create('error',error):''; })
  }

  getBank() {
    this.http.get('guest-manage/v1/app/back/ins').then(data => {
      this.bankList = data;
    })
  }

  changePage(pageNum) {
    this.search(pageNum);
  }
  reset() {
    this.regDate = null;
    this.searchItems = new SearchItems();
  }
  regDateChange(result: Date): void {
    this.searchItems.regStartDate=this.transformServe.dateTransform(result[0]);
    this.searchItems.regEndDate=this.transformServe.dateTransform(result[1]);
  }
}
class SearchItems {
  constructor(
    public mobile?: String,         //手机号
    public regStartDate?: Date,     //注册开始时间
    public regEndDate?: Date,        //注册结束时间
    public insName?: String,
    public insStaffName?: String,
    public registSource?: String
  ) { }
}
