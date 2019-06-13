import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-order-no-search',
  templateUrl: './order-no-search.component.html',
  styleUrls: ['./order-no-search.component.css']
})
export class OrderNoSearchComponent implements OnInit {

  public orderNo;

  constructor(private router: Router,private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>this.orderNo=params["id"]);
    if(this.orderNo){
      this.router.navigate(['/app/business/orderNo/'+this.orderNo]);
    }
  }

}
