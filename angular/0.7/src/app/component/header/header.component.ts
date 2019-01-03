import { Component, OnInit,Input } from '@angular/core';
import { HttpServe } from '../../layout/service/http-serve.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  public nav: any;//其他平台页面跳转数据
  public userInfor: any = {
    name: '未登录',
    account: ''
  };//用户信息
  public password: any={
    popoverShow:false,
    modalShow:false,
    modalLoading:false,
    oldPassword:123,
    newPassword:456
  };//修改密码弹窗
  constructor(
    private http: HttpServe,
  ) { }

  changePassword() {//修改密码
    this.http.patchCustomHeaders(
      'peak-resource/v1/resource/user/pass/' + this.userInfor.account,
      {
        "oldPassword": this.password.oldPassword,//旧密码
        "newPassword": this.password.newPassword,//新密码
      }
    )
      .subscribe(res => {
        console.log(res)
      })
  }

  logout(){//退出登录
    window.location.href=window.location.protocol+'//'+window.location.host+'/logout';
  }

  choiceOk(): void {
    this.password.modalLoading = true;
    window.setTimeout(() => {
      this.password.modalShow = false;
      this.password.modalLoading = false;
    }, 3000);
  }

  choiceCancel(): void {
    this.password.modalShow = false;
  }

  ngOnInit() {
    //登录状态信息
    this.http.getCustomHeaders("peak-resource/v1/resource/apps/permission").subscribe(res => {
      console.log(res)
      this.nav = res.result
    })
    //其他巅峰平台链接跳转
    this.http.getCustomHeaders("peak-resource/v1/resource/user/info").subscribe(res => {
      console.log(res)
      this.userInfor = res.result
    })
  }

}
