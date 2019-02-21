import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './../../shared/service/http-serve.service';
import global from '../../shared/global';

@Component({
  selector: 'app-order-lists',
  templateUrl: './order-lists.component.html',
  styleUrls: ['./order-lists.component.css']
})
export class OrderListsComponent implements OnInit {

  currentTab=0;
  list1=[];
  list2=[];
  orderId;

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeRoute.queryParams.subscribe(e => {
      this.orderId=e.orderId;
      if(this.orderId&&global.reload){
        global.reload=false;
        this.router.navigate(['/order-detail'],{queryParams: {'orderId':this.orderId}})
      }
    })
  }

  ngOnInit() {
    this.http.get('/v2/app/pre/loans').subscribe(res => {
      this.list1=null;
      this.list1=res.result;
    })
    this.http.get('/v2/app/pre/repayPlan').subscribe(res => {
      this.list2=null;
      this.list2=res.result;
    })
  }

  swichNav(e){
    console.log(e.target.id)
    this.currentTab=e.target.id;
  }

}
