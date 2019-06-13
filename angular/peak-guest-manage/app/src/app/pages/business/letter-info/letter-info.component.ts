import { post } from 'selenium-webdriver/http';
import { Http } from '@angular/http';
import { HttpService } from './../../../shared/service/http-serve.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-letter-info',
  templateUrl: './letter-info.component.html',
  styleUrls: ['./letter-info.component.css']
})
export class LetterInfoComponent implements OnInit {
  public rows = {
    "id": "",
    "legalName": "",                              //法人姓名
    "position": "",         //法人职位
    "email": "",            //个人邮箱
    "qq": "",               //QQ
    "etpName": "",                                //企业名称
    "mobile": "",                                 //手机
    "address": "",          //公司地址
    "phone": "",            //公司电话
    "website": "",              //公司网址
    "score": "",            //企业白名单评分
    "telephone2": "",       //传真号码
    "loanLimit": "",                                 //授信额度
    "createDate": "",       //评估时间
    "nickName": "",                                     //昵称
    "status": "",                                       //状态
    "etpId": "",
    "creditLevel":""
  }
  
  public reportUrl;
  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit() {
    var id = this.route.snapshot.params.id;
    this.http.getCustomHeaders('/v1/app/back/pre/'+id+'/detail')
    .subscribe( res => {
        let data=res.result;
        // data.score=Math.round(data.score);
        data.score=parseInt(data.score);
        this.rows=data;
        this.reportUrl = "http://117.41.185.26:4200/companyReport/unscramble?id="+this.rows.etpId;
    });
  }
}
