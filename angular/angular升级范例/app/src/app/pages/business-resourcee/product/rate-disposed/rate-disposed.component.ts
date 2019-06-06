import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ApiService } from './../../../../shared/service/http-serve/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './rate-disposed.component.html',
  styleUrls: ['./rate-disposed.component.less']
})
export class RateDisposedComponent implements OnInit {

  /** 列表title */
  title = "";
  productName = "";
  id = "";

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
  loading = false;
  spinning = true

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private message: NzMessageService,
    private modalService: NzModalService
  ) {
    this.id = this.route.snapshot.queryParams.id;
    this.productName = this.route.snapshot.queryParams.name;
    this.title = this.route.snapshot.queryParams.name;
    this.reset();
    this.search(this.page.pageNum);
  }

  ngOnInit() {
  }
  /** 查询 */
  async search(e) {
    this.page.pageNum = e
    let params = {
      name: this.searchItems.name?this.searchItems.name:"",
      key: this.searchItems.key?this.searchItems.key:"",
      pageNum: this.page.pageNum,
      pageSize: this.page.pageSize
    }
    let res = await this.api.getSysProductRateSetting(this.id, params)
    this.rows = []
    this.rows = res.list;
    this.page.total = res.total;
    this.page.totalPage = res.pages;
    this.spinning = false
  }
  /** 翻页 */
  changePage(e) {
    this.search(e);
  }
  /** 初始化查询和弹窗变量 */
  reset() {
    this.searchItems = new Items();
  }

  /** 删除确认提示框 */
  showDeleteConfirm(data): void {
    this.modalService.confirm({
      nzTitle: '删除提示',
      nzContent: '<b style="color: red;">您正在删除配置项，删除后可能影响调用此参数的程序运行，你还要继续吗？</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => this.delete(data),
      nzCancelText: '取消',
      nzOnCancel: () => { }
    });
  }
  //删除配置项
  async delete(data) {
    let res = await this.api.deleteSysProductRateSetting(data.id)
    if (res) {
      this.message.create("success", "删除成功", { nzDuration: 3000 })
    }
    this.reset();
    this.search(this.page.pageNum);//重新调取后台表格数据
  }

}
class Items {
  constructor(
    public name?: string,
    public number?: string
  ) { }
}