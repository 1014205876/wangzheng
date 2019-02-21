
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-serve.service';
import global from '../../shared/global';

import {
  SwiperConfigInterface,
  SwiperCoverflowEffectInterface,
  SwiperComponent,
  SwiperNavigationInterface,
  SwiperPaginationInterface,
  SwiperAutoplayInterface
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
  bulletElement: 'li'
  // disabledClass?: string;  
  // hiddenClass?: string;
};

const autoplayInterface: SwiperAutoplayInterface = {
  delay: 2000,
  disableOnInteraction: false,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hasMsg;
  // swiper config
  config: SwiperConfigInterface = {
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents: true,   // 修改swiper父元素时，自动初始化swiper
    direction: 'horizontal',// 开启鼠标的抓手状态      
    grabCursor: true,// 被选中的滑块居中，默认居左      
    centeredSlides: true,
    loop: false,
    slidesPerView: 'auto',
    autoplay: autoplayInterface,
    speed: 1000,
    coverflowEffect: coverflowEffectConfig,
    pagination: paginationConfig
  };

  promptShow = global.promptShow;
  prompt = '尊敬的用户！在我们正式通知您获得贷款之前，请勿支付任何费用';

  city;
  products = [];

  banner = [
  ];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.get('/v2/app/pre/messages').subscribe(e => {
      this.hasMsg = false;
      for (let i = 0; i < e.result.length; i++) {
        if (e.result[i].status == '0') {
          this.hasMsg = true;
          break;
        }
      }
    })
    this.http.get('/v2/app/pre/users')
      .subscribe(res => {
        console.log(res)
      })
    this.http.get('/v2/app/pre/banners?number=' + 5)
      .subscribe(res => {
        console.log(res)
        this.banner = res.result;
        // this.config.loop=true
      })
    this.getProduct()

  }

  getProduct() {
    this.http.get('/v2/app/pre/products').subscribe(res => {
      this.products = res.result;
    })
  }
  closePrompt() {
    global.promptShow = false;
    this.promptShow = global.promptShow;
  }

}
