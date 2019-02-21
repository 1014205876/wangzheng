import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import global from '../../shared/global';

@Component({
  selector: 'app-loan-suc',
  templateUrl: './loan-suc.component.html',
  styleUrls: ['./loan-suc.component.css']
})
export class LoanSucComponent implements OnInit {

  etpName;
  pageState;

  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(e => {
      this.pageState=e;
      this.etpName=this.pageState.etpName;
      global.reload=true;
      console.log(this.pageState)
    })
  }

  ngOnInit() {
  }

}
