import { Component, OnInit } from '@angular/core';
import { HttpServe } from './../../../layout/service/http-serve.service';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss']
})
export class IndustryComponent implements OnInit {

  public items;
  rows = [];

  public total;
  public totalPage;
  public pageNum;

  constructor(
    private http: HttpServe
  ) { 
    this.items = new Items();
  }

  ngOnInit() {
    this.search(1,'');
  }

  search(e,type) {
    if(!type){
      this.items = new Items();
    }
    this.http.getCustomHeaders(
      "v1/resource/industry?name="+(this.items.name?encodeURIComponent(this.items.name):'')
      +"&code="+(this.items.code?encodeURIComponent(this.items.code):'')
      +"&pageNum="+e
      +"&pageSize="+10
    ).subscribe(res => {
      // console.log(res);
      this.rows = res.result.list;
      this.total = res.result.total;
      this.totalPage = res.result.pages;
      this.pageNum = res.result.pageNum;
    })
  }

  changePage(e) {
    this.search(e,'');
  }

  reset(){
    this.items = new Items();
  }

}
class Items {
  constructor(
    public name?: String,
    public code?: String
  ){}
}
