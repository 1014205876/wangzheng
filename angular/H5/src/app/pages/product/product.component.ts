import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../shared/service/http-serve.service';
import global from '../../shared/global';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product;
  productIntroduction;
  pageState;

  constructor(private http:HttpService, private activeRoute: ActivatedRoute, private router: Router) {
    this.activeRoute.queryParams.subscribe(e => {
      this.pageState = e;
    })
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
    this.http.get('/v2/app/pre/products').subscribe(res => {
      this.product=res.result[this.pageState.index];
    })
  }

  sure(){
    sessionStorage.dataInit='1';
    this.resetGlobal();
    this.router.navigate(['/loan'], {queryParams: {'id': this.product.id,'name': this.pageState.name}})
  }

  resetGlobal() {
    global.loan = {
      productId: "",
      productName: "",
      etpCer: {
        id: '',
        etpName: '',
        infoAuthNum: ''
      },
      amount: null,
      term: null,
      infoAuth: {
        id: '',
        infoAuthNum: '',
        authUrl: '',
        bodyUrl: '',
        controllerUrl: ''
      },
      repayMethod:"",
      stepSwitch: false
    }
  }

}
