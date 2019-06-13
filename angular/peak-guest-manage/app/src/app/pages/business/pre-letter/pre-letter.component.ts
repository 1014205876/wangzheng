import { DateTransformService } from './../../../shared/service/date-transform.service';
import { Http } from '@angular/http/src/http';
import { HttpService } from './../../../shared/service/http-serve.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-letter',
  templateUrl: './pre-letter.component.html',
  styleUrls: ['./pre-letter.component.css']
})
export class PreLetterComponent implements OnInit {

  public totalPage;
  public letterSearch;
  public mask;
  public rows=[];

  constructor(private http: HttpService, private transform: DateTransformService) {
    this.letterSearch = new LetterSearch();
  }

  ngOnInit() {
    this.search(1);
  }

  search(e) {
    if((this.letterSearch.createStartDate&&this.letterSearch.createEndDate)&&(this.letterSearch.createStartDate>this.letterSearch.createEndDate)){
      this.mask=true;
    }
    
    this.http.getCustomHeaders(
      '/v1/app/back/pre/query?nickName='
      +(this.letterSearch.nickName?this.letterSearch.nickName:'')
      +'&mobile='+(this.letterSearch.mobile?this.letterSearch.mobile:'')
      +'&etpName='+(this.letterSearch.etpName?this.letterSearch.etpName:'')
      +'&legalName='+(this.letterSearch.legalName?this.letterSearch.legalName:'')
      +'&createStartDate='+(this.letterSearch.createStartDate?(this.transform.transform(this.letterSearch.createStartDate)):'')
      +'&createEndDate='+(this.letterSearch.createEndDate?(this.transform.transform(this.letterSearch.createEndDate)):'')
      +'&pageNum='+(e?e:'1')+'&pageSize=10'
    ).subscribe(res => {
        let data=res.result.list;
        this.totalPage=res.result.navigatepageNums.length;
        this.rows=data;
      })
  }

  delete(id) {
    this.http.deleteCustomHeaders('/v1/app/back/pre/'+id+'/delete')
      .subscribe(res=>{
        var result=res.json().result;
        if(result=='OK'){
          this.search('');
        }
      });
  }

  changePage(e) {
    this.search(e);
  }

}
class LetterSearch {
  constructor(
    public nickName?: String,           //昵称
    public mobile?: String,             //手机号
    public etpName?: String,            //企业名称
    public legalName?: String,          //法人姓名
    public createStartDate?: Date,      //评估开始日期
    public createEndDate?: Date         //评估结束日期
  ) {}
}
