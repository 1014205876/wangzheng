import { DateTransformService } from './../../../shared/service/date-transform.service';
import { HttpService } from './../../../shared/service/http-serve.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http/src/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public orderSearch;

  public rows=[];

  public totalPage;

  public orderNo;

  public mask;

  constructor(
    private http: HttpService, 
    private dateTransform: DateTransformService,
    private route: ActivatedRoute,
  ) {
    this.orderSearch = new OrderSearch();
  }

  ngOnInit() {
    this.orderSearch.status = '';
    this.route.params.subscribe((params:Params)=>this.orderNo=params["id"]);
    if(this.orderNo){
      this.orderSearch.no = this.orderNo;
      this.search(1);
    };
    this.search(1);
  }

  search(e) {
    if((this.orderSearch.createStartDate&&this.orderSearch.createEndDate)&&(this.orderSearch.createStartDate>this.orderSearch.createEndDate)){
      this.mask=true;
    }
    this.http.getCustomHeaders(
      '/v1/app/back/loansGrid?regMobile='
      +encodeURIComponent(this.orderSearch.regMobile?this.orderSearch.regMobile:'')
      +"&no="+encodeURIComponent(this.orderSearch.no?this.orderSearch.no:'')
      +"&etpName="+encodeURIComponent(this.orderSearch.etpName?this.orderSearch.etpName:'')
      +"&createStartDate="+encodeURIComponent(this.orderSearch.createStartDate?(this.dateTransform.transform(this.orderSearch.createStartDate)):'')
      +"&createEndDate="+encodeURIComponent(this.orderSearch.createEndDate?this.dateTransform.transform(this.orderSearch.createEndDate):'')
      +"&minTerm="+encodeURIComponent(this.orderSearch.minTerm?this.orderSearch.minTerm:'')
      +"&maxTerm="+encodeURIComponent(this.orderSearch.maxTerm?this.orderSearch.maxTerm:'')
      +"&status="+encodeURIComponent(this.orderSearch.status?this.orderSearch.status:'')
      +'&pageNum='+(e?e:'1')+'&pageSize=10'
    ).subscribe(res => {
        let data=res.result.list;
        this.rows=data;
        this.totalPage=res.result.navigatepageNums.length;
      })
  }

  changePage(e) {
    this.search(e);
  }

  minTerm(){
    if(this.orderSearch.minTerm.length==1){
      this.orderSearch.minTerm=this.orderSearch.minTerm.replace(/[^1-9]/g,'')
    }else{
      this.orderSearch.minTerm=this.orderSearch.minTerm.replace(/\D/g,'')
    }
  }

  maxTerm(){
    if(this.orderSearch.maxTerm.length==1){
      this.orderSearch.maxTerm=this.orderSearch.maxTerm.replace(/[^1-9]/g,'')
    }else{
      this.orderSearch.maxTerm=this.orderSearch.maxTerm.replace(/\D/g,'')
    }
  }

}
class OrderSearch {
  constructor(
    public nickName?: String,
    public etpName?: String,
    public no?: String,
    public status?:String,
    public createStartDate?: Date,
    public createEndDate?: Date,
    public minTerm?:String,
    public maxTerm?:String,
    public id?: String
  ) { } 
}