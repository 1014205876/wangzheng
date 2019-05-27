import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServe } from '../../../../shared/service/http-serve.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import {
  SwiperConfigInterface,
  SwiperZoomInterface
} from 'ngx-swiper-wrapper';
import { stringify } from '@angular/core/src/util';

const zoomInterface: SwiperZoomInterface = {
  maxRatio: 5,
  toggle: true
}

@Component({
  selector: 'app-approve-info',
  templateUrl: './approve-info.component.html',
  styleUrls: ['./approve-info.component.less']
})
export class ApproveInfoComponent implements OnInit {

  @ViewChild('curImg') curImg;
  @ViewChild('imgBig') imgBig;

  breadcrumbs = ['业务管理', '企业客户管理', '企业客户详情'];
  public imgUrl;
  public imgTitle;
  public active = false;

  public rows;

  config: SwiperConfigInterface;
  cerVerSwitch;

  constructor(
    private http: HttpServe,
    private activedRoute: ActivatedRoute,
    private message: NzMessageService,
    private router: Router
  ) {
    this.http.get('peak-resource/v1/resource/settings?key=guestCerVerSwitch').then(data => {
      this.cerVerSwitch = data.value;
    }, (error) => { error ? this.message.create('error', error) : ''; })
  }

  ngOnInit() {
    this.activedRoute.queryParams.subscribe(res => {
      let id = res.id;
      this.http.get("guest-manage/v1/app/back/etpCers/" + id).then(data => {
        this.rows = data;
      });
    })
    this.config = {
      direction: 'horizontal',
      grabCursor: true,
      centeredSlides: true,
      zoom: zoomInterface
    }
  }
  // 图片放大
  // imgScale(url,title) {
    
  //   this.router.navigate(['app/pic/swiper'],{queryParams: {'title': title,'url': JSON.stringify([url])}})
  // }
  // 图片放大
  imgScale(url) {
    this.imgUrl = url;
    this.active = true;
  }
  close(e) {
    this.active=e;
  }

}
