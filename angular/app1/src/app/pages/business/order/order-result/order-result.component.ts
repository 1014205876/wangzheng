import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../../shared/service/http-serve.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { TransformService } from './../../../../shared/service/transform.service';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.less']
})
export class OrderResultComponent implements OnInit {

  breadcrumbs = ['业务管理', '订单管理', '结果录入'];

  public mask = false;
  public loanId;
  public productId;
  public orderInfo;
  public today;
  public loanDate;
  public data = {
    "loanId": "",
    "status": '0',
    "reason": "",
    "approvalAmount": null,
    "approvalTerm": null,
    "loanRate": "",
    "repayMethod": "",
    "serviceRate": "",
    "no": "",
    "loanDate": "",
    "cansubmit": true
  };
  public applyRepayMethod = [];//支持还款方式数据

  constructor(
    private route: ActivatedRoute,
    private http: HttpServe,
    private transformServe: TransformService,
  ) {
    let date = new Date();
    this.loanDate = date;
    this.today = date;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      this.loanId = res.id;
      this.productId = res.productId;
      this.http.get("guest-manage/v1/app/back/loans/" + this.loanId)
        .then(data => {
          this.orderInfo = data;
        })
      this.http.get("peak-resource/v1/resource/products/" + this.productId).then(data => {
        let repayMethods = data.product.repayMethodShow;
        repayMethods.forEach(item => {
          if (item.checked) {
            this.applyRepayMethod.push(item);
          }
        })
      })
    })
  }

  goBack() {
    history.go(-1);
  }

  submit() {
    let formData
    if (this.data.status == '1') {
      formData = {
        "loanId": this.loanId,
        "status": "1",
        "reason": this.data.reason
      }
    } else {
      formData = {
        "loanId": this.loanId,
        "status": "2",
        "approvalAmount": this.data.approvalAmount,
        "approvalTerm": this.data.approvalTerm,
        "loanRate": this.data.loanRate,
        "repayMethod": this.data.repayMethod,
        "serviceRate": this.data.serviceRate,
        "no": this.data.no,
        "loanDate": this.data.loanDate
      }
    }
    this.http.post("guest-manage/v1/app/back/loan/result", formData).then(res => {
      if (res.data) {
        this.goBack();
      }
    })
  }

  ngDoCheck() {
    if (this.data.status == '1') {
      this.checkValue(this.data.reason)
    }
    else {
      if (this.loanDate) {
        this.data.loanDate = this.transformServe.dateTransform(this.loanDate);
      }
      if (this.data.approvalAmount) {
        if (this.data.approvalTerm) {
          if (this.data.loanRate) {
            if (this.data.repayMethod) {
              if (this.data.serviceRate) {
                if (this.data.no) {
                  if (this.data.loanDate) {
                    this.data.cansubmit = false;
                  }
                  else { this.data.cansubmit = true; }
                }
                else { this.data.cansubmit = true; }
              }
              else { this.data.cansubmit = true; }
            }
            else { this.data.cansubmit = true; }
          }
          else { this.data.cansubmit = true; }
        }
        else { this.data.cansubmit = true; }
      }
      else { this.data.cansubmit = true; }
    }
  }
  checkValue(value) {
    if (value) {
      this.data.cansubmit = false
    } else {
      this.data.cansubmit = true
    }
  }

}
