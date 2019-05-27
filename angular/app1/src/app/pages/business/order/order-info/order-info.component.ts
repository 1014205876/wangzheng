import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../../shared/service/http-serve.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { TransformService } from './../../../../shared/service/transform.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.less']
})
export class OrderInfoComponent implements OnInit {

  breadcrumbs = ['业务管理','订单管理', '订单详情'];

  public imgUrl;
  public active=false;
  public loading = false;
  public mask = false;

  appointTime;
  appointConfirmTime;

  public info;

  imgList=[]
  public basicInfoUrl;

  constructor(
    private activedRoute: ActivatedRoute,
    private transformServe: TransformService,
    private message: NzMessageService,
    private http: HttpServe,
    private router: Router
  ) {
    this.activedRoute.queryParams.subscribe(res => {
      let id = res.id;
      this.http.get('guest-manage/v1/app/back/loans/'+id).then(data => {
        this.info=data;
        if(this.info.applyDataList){
          this.info.applyDataList.forEach(item=>{
            if(item.type=='multiplePic'){
              item.value=this.transformStr(item.value)
              this.imgList.push({"name": item.controlName,"value":item.value[0]})
            } if(item.type=='pic') {
              this.imgList.push({"name": item.controlName,"value":item.value})
            }
          })
        }
        this.basicInfoUrl = 'http://117.41.185.26:4200/companyReport/basicInfo?id=' + this.info.etpId;
      }, (error) => { error ? this.message.create('error', error) : '';this.loading=false; })
    })
  }

  ngOnInit() {};
  transformTime(e){
    if(e&&e.match(/14:00:00/)){
      return e.replace(/14:00:00/, 'PM')
    }else if(e&&e.match(/08:00:00/)){
      return e.replace(/08:00:00/, 'AM')
    }else {
      return e;
    }
  }
  transformStr(e){
    return JSON.parse(e);
  }

  // 图片放大
  imgScale(url) {
    this.imgUrl = url;
    this.active = true;
  }
  close(e) {
    this.active=e;
  }

}
