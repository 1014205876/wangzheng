import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/service/http-serve/api.service';

@Component({
  selector: 'app-modeldata',
  templateUrl: './modeldata.component.html',
  styleUrls: ['./modeldata.component.css']
})
export class ModeldataComponent implements OnInit {

  // 查询字段
  public searchItems;

  // 表格数据
  rows = [];
  page = {
    total: 1,
    totalPage: 1,
    pageNum: 1,
    pageSize: 10
  }
  loadingDelay = 500;
  loading = true

  constructor(
    private api: ApiService,
  ) {
    this.reset();
    this.search(1);
  }
  ngOnInit() { }

  reset() {
    this.searchItems = new Items();
  }
  async search(e) {
    this.page.pageNum = e
    let params = {
      name: this.searchItems.name,
      key: this.searchItems.key,
      pageNum: this.page.pageNum,
      pageSize: this.page.pageSize
    }
    let data = await this.api.getModels(params)
    this.rows = data
    this.loading = false
  }

}

class Items {
  constructor(
    public name?: String,
    public key?: String
  ) { }
}
