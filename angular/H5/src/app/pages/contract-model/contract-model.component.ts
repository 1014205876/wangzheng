import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../shared/service/http-serve.service';

@Component({
  selector: 'app-contract-model',
  templateUrl: './contract-model.component.html',
  styleUrls: ['./contract-model.component.less']
})
export class ContractModelComponent implements OnInit {

  product;
  pageState;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private router: Router
    ) {
    this.activeRoute.queryParams.subscribe(e => {
      this.pageState = e;
    })
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.http.get('/v2/app/pre/products').subscribe(res => {
      console.log(res);
      this.product = res.result[this.pageState.index];
      console.log(this.product)
    })
  }

  routeDetail(item, pagestateindex, index) {
    this.router.navigate(['/contract-detail'], { queryParams: { 'pagestateindex': pagestateindex, 'index': index } })
  }

}
