import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/service/http-serve/api.service';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.less']
})
export class IndustryComponent implements OnInit {

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
    private api: ApiService
  ) {
    this.loading = true
    this.reset();
    this.search(this.page.pageNum)
  }

  ngOnInit() {
  }

  async search(e) {
    this.page.pageNum = e
    let params = {
      name: this.searchItems.name,
      code: this.searchItems.code,
      pageNum: this.page.pageNum,
      pageSize: this.page.pageSize
    }
    let res = await this.api.getIndustryList(params)
    this.rows = res.list;
    this.page.total = res.total;
    this.page.totalPage = res.pages;
    this.page.pageNum = res.pageNum;
    this.loading = false

  }
  changePage(e) {
    this.search(e);
  }

  reset() {
    this.searchItems = new Items();
  }

}
class Items {
  constructor(
    public name?: String,
    public code?: String
  ) { }
}