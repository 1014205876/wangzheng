import { post } from 'selenium-webdriver/http';
import { Http } from '@angular/http';
import { HttpService } from './../../../shared/service/http-serve.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  SwiperComponent, 
  SwiperDirective, 
  SwiperConfigInterface,
  SwiperScrollbarInterface, 
  SwiperPaginationInterface,
  SwiperCoverflowEffectInterface,
  SwiperNavigationInterface
} from 'ngx-swiper-wrapper';
import status from '../../../shared/status';

@Component({
  selector: 'app-authorize-info',
  templateUrl: './authorize-info.component.html',
  styleUrls: ['./authorize-info.component.css']
})
export class AuthorizeInfoComponent implements OnInit {

  @ViewChild('curImg') curImg;
  @ViewChild('imgBig') imgBig;
  public imgUrl;
  public active = false;
  public baseUrl = 'http://192.168.111.212:6200/';

  //建议的文本内容
  public agreement:String='';
  public mask=false;
  public flagS;

  public disabled: boolean = false;


  public data = {
      "id": "",
      "createDate": "",
      "updateDate": "",
      "authUrl": "",
      "bodyUrl": "",
      "status": "",
      "etpName": "",
      "no": "",
      "userId": "",
      "nickName": "",
      "comments": "",
      "type": "",
      "controllerAuthUrl": "",
      "legalName": "",
      "idCode": "",
      "controllerName": "",
      "controllerIdCode": ""
    };
  public id;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router,
  ) { }

  ngOnInit() {
    if(status.authorizeItem.id != '') {
      this.data = status.authorizeItem;
      this.id = this.data.id;
    }else {
      this.goBack();
    }
  }

  passResult(flag){
    var id = this.id;
    this.agreement = this.getFormatCode(this.agreement);
    var comment = {
      "id": this.id,
      "comments": this.agreement
    }
    if((flag == 'T')) {
      this.http.postCustomHeaders('/v1/app/back/auth/info/pass', comment)
        .subscribe(res=>{
          var result = res.result;
          if(result=='1') {
            this.goBack();
            // this.router.navigateByUrl("/app/business/authorizeinfo");
          }else {
            alert('操作失败！');
          }
        });
    }else if((flag == 'F')) {
      this.http.postCustomHeaders('/v1/app/back/auth/info/noPass', comment)
        .subscribe(res=>{
          var result = res.result;
          if(result=='1') {
            this.goBack();
            // this.router.navigateByUrl("/app/business/authorizeinfo");
          }else {
            alert('操作失败！');
          }
        });
    };
  }

  goBack() {  
    history.go(-1);
  }
  
  getFormatCode(e) {
    return e.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
  }

  // 图片放大
  imgScale(url) {
    this.imgUrl = url;
    this.active = true;
  }

}
