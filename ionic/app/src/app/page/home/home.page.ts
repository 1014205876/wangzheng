import { Component, OnInit } from '@angular/core';
import { selfHttp } from '../../shared/service/http-service';
import { ActivatedRoute } from '@angular/router';

import {
    SwiperConfigInterface,
    SwiperCoverflowEffectInterface,
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
    config: SwiperConfigInterface

    promptShow = false;
    prompt = '尊敬的用户！在我们正式通知您获得贷款之前，请勿支付任何费用';

    city;
    products = [];

    banner = [];

    public insStaffNum: any//邀请信息

    constructor(
        private http: selfHttp,
        private activeRoute: ActivatedRoute
    ) {
        this.activeRoute.queryParams.subscribe((e) => {
            this.insStaffNum = e || {}
        })
    }

    ngOnInit() {
        let that = this;
        this.http.get(//获取banner信息
            '/kalanchoe-manager/v1/app/pre/banners/banners?number=5',
            res => {
                that.banner = res.data;
                that.config = {
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
            }
        );
        this.getProduct()
        setTimeout(() => {//如果不添加一个定时器滚动标签不工作
            this.promptShow = true;
        }, 0);
    }

    getProduct() {
        this.http.get(//获取产品信息
            '/kalanchoe-manager/v2/app/pre/product',
            res => {
                // this.products = res.data;
            }
        );
    }
    closePrompt() {
        this.promptShow = false;
    }
}
