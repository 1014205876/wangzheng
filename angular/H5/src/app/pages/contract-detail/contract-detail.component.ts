import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../shared/service/http-serve.service';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})
export class ContractDetailComponent implements OnInit {

  pageState={
    name:'',
    value:''
  };
  pagestateindex;
  index;
  constructor(
    private http: HttpService,
    private activatedroute: ActivatedRoute
    ) {
    this.activatedroute.queryParams.subscribe(res=> {
      // this.pageState=JSON.parse(res.item);
      // console.log(this.pageState)
      console.log(res);
      this.pagestateindex=res.pagestateindex
      this.index=res.index
    })
  }

  ngOnInit() {
    this.http.get('/v2/app/pre/products').subscribe(res => {
      console.log(res);
      this.pageState=res.result[this.pagestateindex].productMaterial[this.index]
      // this.product=res.result[this.pageState.index];
      // console.log(this.product)
    })
  }

}
