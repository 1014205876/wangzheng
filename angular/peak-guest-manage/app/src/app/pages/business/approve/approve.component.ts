import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../shared/service/http-serve.service';
import { Http } from '@angular/http/src/http';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  public approveSearch;
  public totalPage;
  public rows=[];

  constructor(private http: HttpService) {
    this.approveSearch = new ApproveSearch();
  }

  ngOnInit() {
    this.approveSearch.status = '';
    this.search(1);
  }

  search(e) {
    this.http.getCustomHeaders(
      "/v1/app/back/etpCersGrid?regMobile="
      +encodeURIComponent(this.approveSearch.regMobile?this.approveSearch.regMobile:'')
      +"&mobile="+encodeURIComponent(this.approveSearch.mobile?this.approveSearch.mobile:'')
      +"&etpName="+encodeURIComponent(this.approveSearch.etpName?this.approveSearch.etpName:'')
      +"&legalName=" +encodeURIComponent(this.approveSearch.legalName?this.approveSearch.legalName:'')
      +"&creditCode="+encodeURIComponent(this.approveSearch.creditCode?this.approveSearch.creditCode:'')
      // +"&code="+(this.approveSearch.code?this.approveSearch.code:'')
      +"&status=1"
      +'&pageNum='+(e?e:'1')+'&pageSize=10'
    ).subscribe(res=>{
      let data=res.result.list;
      this.totalPage=res.result.navigatepageNums.length;
      this.rows=data;
    });
  }

  changePage(e) {
    this.search(e);
  }

}
class ApproveSearch {
  constructor(
    public nickName?: String,         //昵称
    public status?: String,           //认证状态  1 通过 0  未通过
    public etpName?: String,          //企业名称
    public legalName?: String,        //法人姓名
    public creditCode?: String,       //统一社会信用代码
    // public code?: String,             //机构信用代码
    public mobile?: String            //法人手机号
  ) { }
}
