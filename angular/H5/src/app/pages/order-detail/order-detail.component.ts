import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './../../shared/service/http-serve.service';
import global from '../../shared/global';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  obj;
  pageState;
  controllerCreditUrls;
  corporateCreditUrls;

  constructor(private http: HttpService, private activeRoute: ActivatedRoute, private router: Router) {
    this.activeRoute.queryParams.subscribe(e => {
      this.pageState = e;
    })
    global.reload=false;
  }

  ngOnInit() {
    this.http.get('/v2/app/pre/loans/' + this.pageState.orderId).subscribe(res => {
      this.obj = res.result;
      this.controllerCreditUrls=this.obj.controllerCreditUrls;
      this.corporateCreditUrls=this.obj.corporateCreditUrls;
    })
    
  }
  getInfo(e) {
    let data = {
      etpCer: {
        id: this.obj.loanApply.etpCerId,
        etpName: this.obj.loanApply.etpName,
        infoAuthNum: this.obj.loanApply.infoAuthNum
      },
      authUrl: this.obj.loanApply.authUrl,
      bodyUrl: this.obj.loanApply.bodyUrl,
      controllerUrl: this.obj.loanApply.controllerUrl,
      infoAuthDto: {
        status: 1
      }
    }
    this.router.navigate(['/get-information'], { queryParams: { 'data': JSON.stringify(data) } })
  }

  reloan(obj){
    console.log(obj)
    sessionStorage.dataInit='0';
    this.router.navigate(['/loan'], { queryParams: { 'reloan': 'yes', 'orderId': this.pageState.orderId, 'productId': obj.loanApply.productId } });
  }

  transformTime(e){
    return e ? (e.match(/14:00:00/) ? e.replace(/14:00:00/, 'PM') : e.replace(/08:00:00/, 'AM')) : '';
  }
  reportInfo(){}
}
