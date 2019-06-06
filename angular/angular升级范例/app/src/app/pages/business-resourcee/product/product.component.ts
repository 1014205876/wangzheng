import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../shared/service/http-serve/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  /** 查询字段 */
  public searchItems;

  /** 表格数据 */
  rows = [];
  page = {
    "total": 1,         /** 总条数 */
    "totalPage": 1,     /** 总页数 */
    "pageNum": 1,        /** 当前页码 */
    "pageSize": 10      /** 每页展示多少条数据 */
  }
  loadingDelay = 500;
  loading = true;

  constructor(
    private api: ApiService,
    private message: NzMessageService
  ) {
    this.reset();
    this.search(this.page.pageNum);
  }

  ngOnInit() {
  }
  /** 查询 */
  async search(e) {
    this.page.pageNum = e
    let params = {
      name: this.searchItems.name,
      number: this.searchItems.number,
      pageNum: this.page.pageNum,
      pageSize: this.page.pageSize
    }
    let res = await this.api.getProductList(params)
    this.rows = []
    this.rows = res.list;
    this.page.total = res.total;
    this.page.totalPage = res.pages;
    this.page.pageNum = res.pageNum;
    this.loading = false
  }
  /** 翻页 */
  changePage(e) {
    this.search(e);
  }
  /** 初始化查询和弹窗变量 */
  reset() {
    this.searchItems = new Items();
  }
  // 开关按钮
  async switchange(row) {
    if (row.status == 0) {
      row.status = 1;
    } else if (row.status == 1) {
      row.status = 0;
    }
    let res = await this.api.changeProductStatus(row)
    if (res) this.message.create('success', row.name + ' 状态修改成功!', { nzDuration: 3000 })
  }

}
class Items {
  constructor(
    public name?: string,
    public number?: string
  ) { }
}