
import { DateTransformService } from '../../shared/service/date-transform.service';
import { HttpService } from '../../shared/service/http-serve.service';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';

import * as $  from 'jquery';

// declare var $:any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  public customerSearch;
  public totalPage;
  public mask=false;

  public rows=[];
  public bankList;
  sourceData=["app","小程序","手机网页"]

  constructor(
    private http: HttpService, 
    private transform: DateTransformService,
    private renderer: Renderer2, elRef: ElementRef
  ) {
    this.customerSearch = new CustomerSearch();
    this.customerSearch.registSource='';
    this.customerSearch.insName='';
  }

  ngOnInit() {
    this.search(1);
    this.getBank()
  }

  search(e) {
    if((this.customerSearch.regStartDate&&this.customerSearch.regEndDate)&&(this.customerSearch.regStartDate>this.customerSearch.regEndDate)){
      this.mask=true;
    }
    
    this.http.getCustomHeaders(
      '/v1/app/back/usersGrid?mobile='
      +encodeURIComponent(this.customerSearch.mobile?this.customerSearch.mobile:'')
      +'&regStartDate='+encodeURIComponent(this.customerSearch.regStartDate?this.transform.transform(this.customerSearch.regStartDate):'')
      +'&regEndDate='+encodeURIComponent(this.customerSearch.regEndDate?this.transform.transform(this.customerSearch.regEndDate):'')
      +'&insName='+(this.customerSearch.insName?this.customerSearch.insName:'')
      +'&registSource='+(this.customerSearch.registSource?this.customerSearch.registSource:'')
      +'&pageNum='+(e?e:'1')+'&pageSize=10'
    ).subscribe(res => {
        let data=res.result.list;
        this.totalPage=res.result.navigatepageNums.length;
        this.rows=data;
      })
  }

  getBank(){
    this.http.getCustomHeaders('/v1/app/back/ins').subscribe(res => {
      this.bankList=res.result;
    })
  }

  changePage(e) {
    this.search(e);
  }
}
class CustomerSearch {
  constructor(
    public mobile?: String,         //手机号
    public regStartDate?: Date,     //注册开始时间
    public regEndDate?: Date,        //注册结束时间
    public insName?: String,
    public insStaffName?: String,
    public registSource?: String
  ) { }
}

