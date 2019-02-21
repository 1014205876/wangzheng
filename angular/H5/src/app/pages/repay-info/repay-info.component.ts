import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repay-info',
  templateUrl: './repay-info.component.html',
  styleUrls: ['./repay-info.component.css']
})
export class RepayInfoComponent implements OnInit {
  data={
    no: '1',
    productName: '征信贷',
    etpName: '1',
    loanAmount: '1',
    loanTerm: '1',
    repayInterestTotal: '1',
    repayAccountTotal: '1',
    applyDate: '1',
    loanDate: '1',

    repayPlan: [
      {
        repayTime: '1',
        borrowTimes: '1',
        repayAccountAll: '1',
        repayAccountCapital: '1',
        repayAccountInterest: '1'
      }
    ]
  }

  constructor() { }

  ngOnInit() {
  }

}
