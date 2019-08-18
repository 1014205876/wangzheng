import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.less']
})
export class SwiperComponent implements OnInit {
  isVisible = false;
  imgArr = [
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' },
    { mediaUrl: '../../../assets/images/banner.png' }
  ];
  @ViewChild("appCode") changeCode;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.imgArr = [
      { mediaUrl: '../../../assets/images/banner.png' },
      { mediaUrl: '../../../assets/images/banner.png' },
      { mediaUrl: '../../../assets/images/banner.png' },
      { mediaUrl: '../../../assets/images/banner.png' },
      { mediaUrl: '../../../assets/images/banner.png' },
      { mediaUrl: '../../../assets/images/banner.png' }
    ];
    this.changeCode.getBanner();
  }

}
