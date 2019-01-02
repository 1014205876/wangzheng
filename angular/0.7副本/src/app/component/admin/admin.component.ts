import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../layout/service/http-serve.service';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  public navleft:any={
    menu:[],
    resource:[],
  };//存放左导航数据
  public navright:any;//存放其他平台页面跳转

  constructor(
    private http: HttpServe,
  ) { }
  ngOnInit() {
    //登录状态信息
    this.http.getCustomHeaders("peak-resource/v1/resource/apps/permission").subscribe(res => {
      console.log(res)
      this.navright=res.result
    })
    //其他巅峰平台链接跳转
    this.http.getCustomHeaders("peak-resource/v1/resource/user/info").subscribe(res => {
      console.log(res)
    })
    //左导航栏导航
    this.http.getCustomHeaders("/peak-resource/api/resource/user/permission").subscribe(res => {
      // console.log(res);
      this.navleft=res.result
    })
  }

}
