import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.less']
})
export class ApproveComponent implements OnInit {

  breadcrumbs = ['业务管理','企业客户管理'];

  public searchItems;
  public rows=[];
  loading=false;

  page={
    "total":0,         //总条数
    "totalPage":1,     //总页数
    "pageNum":1,        //当前页码
    "pageSize": 10      //每页展示多少条数据
  }

  constructor(
    private http: HttpServe,
    private message: NzMessageService
  ) {
    this.reset();
    this.search(1);
  }

  ngOnInit() {}
  search(pageNum) {
    this.loading=true;
    this.http.get(
      "guest-manage/v1/app/back/etpCersGrid?regMobile="
      +encodeURIComponent(this.searchItems.regMobile?this.searchItems.regMobile:'')
      +"&mobile="+encodeURIComponent(this.searchItems.mobile?this.searchItems.mobile:'')
      +"&etpName="+encodeURIComponent(this.searchItems.etpName?this.searchItems.etpName:'')
      +"&legalName=" +encodeURIComponent(this.searchItems.legalName?this.searchItems.legalName:'')
      +"&creditCode="+encodeURIComponent(this.searchItems.creditCode?this.searchItems.creditCode:'')
      +"&status=1"
      +'&pageNum='+(pageNum?pageNum:'1')+'&pageSize=10'
    ).then(data=>{
      this.rows=data.list;
      this.page.total=data.total;
      this.page.pageNum=data.pageNum;
      this.page.totalPage=data.pages;
      this.loading=false;
    }, 
    (error)=>{error?this.message.create('error',error):'';this.loading=false;});
  }

  reset() {
    this.searchItems = new SearchItems();
  }
  changePage(e) {
		this.search(e)
  }

}
class SearchItems {
  constructor(
    public nickName?: String,         //昵称
    public status?: String,           //认证状态  1 通过 0  未通过
    public etpName?: String,          //企业名称
    public legalName?: String,        //法人姓名
    public creditCode?: String,       //统一社会信用代码
    public mobile?: String            //法人手机号
  ) { }
}
