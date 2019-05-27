import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpServe } from '../../shared/service/http-serve.service';
import { ActivatedRoute } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-look-authorization',
    templateUrl: './look-authorization.component.html',
    styleUrls: ['./look-authorization.component.scss']
})

export class LookAuthorizationComponent implements OnInit {

    swiperArr = [];//装载swiper图片的数组
    config: SwiperConfigInterface;
    swiperIndex = 0;//当前选中的swiper的下标

    canvasArr = [];//canvas标签
    imgArr = [];//隐藏起来的img标签（用于确定画布中图片的宽高）
    cxtArr = [];//canvas画布

    constructor(
        private el: ElementRef,
        private http: HttpServe,
        public activedRoute: ActivatedRoute,
        private message: NzMessageService,
    ) {
        this.activedRoute.queryParams.subscribe(res => {
            this.swiperArr = JSON.parse(res.url);
            this.getBanner();
        })
    }
    ngOnInit() {}

    getBanner() {
        // this.swiperArr = [
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557031014395&di=0aeed81b843690e94ad185bbd11e9a70&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FWgjcTIco7s4BN2OcRNAe_A%3D%3D%2F884675851802636535.jpg',
        //     },
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557031014395&di=0aeed81b843690e94ad185bbd11e9a70&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FWgjcTIco7s4BN2OcRNAe_A%3D%3D%2F884675851802636535.jpg',
        //     },
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557031014395&di=0aeed81b843690e94ad185bbd11e9a70&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FWgjcTIco7s4BN2OcRNAe_A%3D%3D%2F884675851802636535.jpg',
        //     },
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557031014395&di=0aeed81b843690e94ad185bbd11e9a70&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FWgjcTIco7s4BN2OcRNAe_A%3D%3D%2F884675851802636535.jpg',
        //     },
        //     {
        //         url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557031014395&di=0aeed81b843690e94ad185bbd11e9a70&imgtype=0&src=http%3A%2F%2Fimg.bimg.126.net%2Fphoto%2FWgjcTIco7s4BN2OcRNAe_A%3D%3D%2F884675851802636535.jpg',
        //     },
        // ]
        this.config = {
            direction: 'horizontal',
            grabCursor: true,
            centeredSlides: true,
            zoom: {
                maxRatio: 3,
                toggle: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            normalizeSlideIndex: true,
        }

        setTimeout(() => {//确保生成swiper标签且图片宽高已经获取
            this.canvasArr = this.el.nativeElement.querySelectorAll(".canvas");
            this.imgArr = this.el.nativeElement.querySelectorAll(".banner_img");
            for (let i = 0; i < this.imgArr.length; i++) {
                this.cxtArr[i] = this.canvasArr[i].getContext("2d");
                this.cxtArr[i].rotate(0 * Math.PI / 180);
                this.cxtArr[i].translate(0, 0);
                // that.cxtArr[i].rotate(90 * Math.PI / 180);
                // that.cxtArr[i].translate(0, -that.canvasArr[i].height);
                // that.cxtArr[i].rotate(180 * Math.PI / 180);
                // that.cxtArr[i].translate(-that.canvasArr[i].width, -that.canvasArr[i].height);
                // that.cxtArr[i].rotate(270 * Math.PI / 180);
                // that.cxtArr[i].translate(-that.canvasArr[i].width, 0);
                this.cxtArr[i].drawImage(
                    this.imgArr[i],
                    (this.canvasArr[i].width - this.imgArr[i].width) / 2,
                    (this.canvasArr[i].height - this.imgArr[i].height) / 2,
                    this.imgArr[i].width,
                    this.imgArr[i].height
                )
            }
        }, 100)
    }

    swiperIndexChange(e) {//swiper切换时触发
        this.swiperIndex = e;
    }

    rotate(status) {//修改swiper内canvas的旋转
        let index = this.swiperIndex;
        this.cxtArr[index].clearRect(0, 0, this.canvasArr[index].width, this.canvasArr[index].height);
        if (status == 'right') {//每次旋转90度
            this.cxtArr[index].rotate(90 * Math.PI / 180);//绕画布左上角旋转
            this.cxtArr[index].translate(0, -this.canvasArr[index].height);//调整旋转后的画布位置使图片居中
        } else {//每次旋转270度
            this.cxtArr[index].rotate(270 * Math.PI / 180);
            this.cxtArr[index].translate(-this.canvasArr[index].width, 0);
        }
        this.cxtArr[index].drawImage(//在画布中插入图片
            this.imgArr[index],//图片对象
            (this.canvasArr[index].width - this.imgArr[index].width) / 2,//图片定位left
            (this.canvasArr[index].height - this.imgArr[index].height) / 2,//图片定位top
            this.imgArr[index].width,//图片宽
            this.imgArr[index].height//图片高
        )
    }


}
