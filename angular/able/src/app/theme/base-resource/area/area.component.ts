import { Component, OnInit } from '@angular/core';
import { HttpServe } from './../../../layout/service/http-serve.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

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
      "v1/resource/region?name="+(this.items.name?encodeURIComponent(this.items.name):'')
      +"&code="+(this.items.code?encodeURIComponent(this.items.code):'')
      +"&cityCode="+(this.items.cityCode?encodeURIComponent(this.items.cityCode):'')
      +"&zipCode="+(this.items.zipCode?encodeURIComponent(this.items.zipCode):'')
      +"&pageNum="+e+"&pageSize="+10
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
    this.items = {};
  }

}
class Items {
  constructor(
    public name?: String,
    public id?: String,
    public cityCode?: String,
    public zipCode?: String,
  ){}
}
