import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import {
  SwiperConfigInterface,
  SwiperCoverflowEffectInterface,
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
// 分页器
const paginationConfig: SwiperPaginationInterface = {  
  el: '.swiper-pagination',
  type: 'bullets', 
  bulletElement : 'li',
  hideOnClick: true
};

const zoomInterface: SwiperZoomInterface = {
  maxRatio: 2,
  toggle: true
}

@Component({
  selector: 'app-form-multi-img',
  templateUrl: './form-multi-img.component.html',
  styleUrls: ['./form-multi-img.component.css']
})
export class FormMultiImgComponent implements OnInit {

  config: any;
  group: FormGroup;

  pageState;
  imgList=[];
  imgUrl;
  hasClick=false;

  swiperConfig: SwiperConfigInterface;

  constructor(private router: Router, private activatedroute: ActivatedRoute) {
    this.activatedroute.queryParams.subscribe(res => {
      this.pageState=res;
    })

  }

  ngOnInit() {
    if(this.config.value){
      this.imgList=JSON.parse(this.config.value);
    }
    this.setConfig();
  }
  setConfig(){
    this.swiperConfig = {      
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
  routePic(){
    this.router.navigate(['/form-multi-pic'],{queryParams: {'id':this.pageState.id,'name': this.pageState.name, 'key': this.config.controlKey, 'imgUrl': (this.config.value?this.config.value:''),'title': this.config.controlName}})
  }
  imgScale(e){
    this.imgUrl=e;
  }
}
