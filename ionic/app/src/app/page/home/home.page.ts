import { Component, OnInit } from '@angular/core';
import { selfHttp } from '../../shared/service/http-service';

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
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
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

    promptShow = false;
    prompt = '尊敬的用户！在我们正式通知您获得贷款之前，请勿支付任何费用';

    city;
    products = [];

    banner = [];

    constructor(private http: selfHttp) { }

    ngOnInit() {
        let that = this;
        this.http.get(//获取banner信息
            '/guest-client/v2/app/pre/messages',
            res => {
                console.log(res);
                this.hasMsg = false;
                for (let i = 0; i < res.result.length; i++) {
                    if (res.result[i].status == '0') {
                        that.hasMsg = true;
                        break;
                    }
                }
            }
        );
        this.http.get(//获取banner信息
            '/guest-client//v2/app/pre/users',
            res => {
                console.log(res);
            }
        );
        this.http.get(//获取banner信息
            '/guest-client//v2/app/pre/banners?number=5',
            res => {
                console.log(res);
                this.banner = res.result;
            }
        );
        this.getProduct()
        setTimeout(() => {//如果不添加一个定时器滚动标签不工作
            this.promptShow = true;
        }, 0);
    }

    getProduct() {
        this.http.get(//获取banner信息
            '/guest-client//v2/app/pre/products',
            res => {
                console.log(res);
                this.products = res.result;
            }
        );
    }
    closePrompt() {
        this.promptShow = false;
    }
}
