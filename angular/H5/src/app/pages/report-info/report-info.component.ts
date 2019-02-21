import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './../../shared/service/http-serve.service';

import {
  SwiperConfigInterface,
  SwiperCoverflowEffectInterface,
  SwiperComponent,
  SwiperNavigationInterface,
  SwiperPaginationInterface,
  SwiperZoomInterface
} from 'ngx-swiper-wrapper';

// 3D 切换效果参数设置
const coverflowEffectConfig: SwiperCoverflowEffectInterface = {  
  rotate: 0,  
  stretch: 200,  
  depth: 200,  
  modifier: 1,  
  slideShadows: false
};
// 前进后退按钮配置
// const navigationConfig: SwiperNavigationInterface = {  
//   nextEl: '.swiper-button-next',  
//   prevEl: '.swiper-button-prev',  
//   hideOnClick: true  
//   // disabledClass?: string;  
//   // hiddenClass?: string;
// };
// 分页器
const paginationConfig: SwiperPaginationInterface = {  
  el: '.swiper-pagination',
  type: 'bullets', 
  bulletElement : 'li',
  hideOnClick: true  
  // disabledClass?: string;  
  // hiddenClass?: string;
};

const zoomInterface: SwiperZoomInterface = {
  maxRatio: 5,
  toggle: true
}

@Component({
  selector: 'app-report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.css']
})
export class ReportInfoComponent implements OnInit {
  pageState;
  imgList=[];
  title;
  etpName;
  controllerName;
  controllerCreditUrls;
  corporateCreditUrls;

  // swiper config
  config: SwiperConfigInterface;

  constructor(private activeRoute: ActivatedRoute, private http: HttpService) {
    this.activeRoute.queryParams.subscribe(e => {
      this.pageState=e;
      this.title=this.pageState.title;
      this.etpName=this.pageState.etpName;
      this.imgList=JSON.parse(this.pageState.value);
      this.setConfig();
    })
    
  }

  ngOnInit() {}
  getInfo(){
    
    this.http.get('/v2/app/pre/loans/' + this.pageState.orderId).subscribe(res => {
      this
      // this.controllerCreditUrls=res.result.controllerCreditUrls;
      // this.corporateCreditUrls=res.result.corporateCreditUrls;
      // if(this.pageState.name=='corporateCreditUrls'){
      //   this.title='企业征信报告';
      //   this.etpName=res.result.loanApply.etpName;
      //   this.imgList=this.corporateCreditUrls;
      // }else if(this.pageState.name=='controllerCreditUrls') {
      //   this.title='大股东/实际控制人征信报告';
      //   this.controllerName=res.result.loanApply.controllerName;
      //   this.imgList=this.controllerCreditUrls;
      // }
      
    })
  }

  setConfig(){
    this.config = {      
      direction: 'horizontal',
      // 开启鼠标的抓手状态
      grabCursor: true,
      // 被选中的滑块居中，默认居左
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      zoom: zoomInterface,
      coverflowEffect: coverflowEffectConfig,
      // 前进后退按钮设置
      // navigation: navigationConfig
      pagination: paginationConfig
    };
  }

}
