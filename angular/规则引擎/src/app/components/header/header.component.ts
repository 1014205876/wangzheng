import { Component, OnInit, Input } from '@angular/core';
import { HttpServe } from '../../layout/service/http-serve.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  constructor(
    private http: HttpServe,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {
  }

  public nav: any;//其他平台页面跳转数据
  public userInfor: any = {//用户信息
    name: '未登录',
    account: ''
  };//用户信息
  public password: any = {//修改密码弹窗
    popoverShow: false,
    modalShow: false,
    modalLoading: false,
    submitDisable: false,
  };//修改密码弹窗
  passwordForm: FormGroup;//修改密码表单

  logout() {//退出登录
    window.location.href = window.location.protocol + '//' + window.location.host + '/logout';
  }

  changePassword(): void {//新密码修改时调用。保证2次输入密码相同
    Promise.resolve().then(() => this.passwordForm.controls.surePassword.updateValueAndValidity());
  }

  newPasswordOption = (control: FormControl): { [s: string]: boolean } => {//校验新密码input框是否输入正确
    if (!control.value) {
      return { required: true };
    } else if (control.value.search(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/)) {
      return { pattern: true, error: true };
    }
  };

  surePasswordOption = (control: FormControl): { [s: string]: boolean } => {//校验确认新密码input框是否输入正确
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.passwordForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
  };

  paddr() {//由于弹窗在弹出蒙版时会给body添加一个padding-right=17px;清除掉
    // document.getElementById('body').style.paddingRight = '0px'
    // setTimeout(function () {
    //   document.getElementById('body').style.paddingRight = '0px'
    // }, 0)
  }

  choiceOk(): void {//点击修改密码确认按钮
    let that = this;
    console.log(that.passwordForm)
    that.password.modalLoading = true;
    that.http.patchCustomHeaders(
      'peak-resource/v1/resource/user/pass/' + that.userInfor.account,
      {
        "oldPassword": that.passwordForm.value.oldPassword,//旧密码
        "newPassword": that.passwordForm.value.newPassword,//新密码
      }
    )
      .subscribe(res => {
        console.log(res);
        that.passwordForm = that.fb.group({
          oldPassword: [null, [Validators.required]],
          newPassword: [null, [Validators.required, that.newPasswordOption]],
          surePassword: [null, [Validators.required, that.surePasswordOption]],
        });
        that.password.modalShow = false;
        that.password.modalLoading = false;
        if (res.code == '200') {
          that.message.create('success', `修改密码成功`, { nzDuration: 2000 });
        } else {
          that.message.create('error', `修改密码失败，${res.reason}`, {});
        }
      })
  }

  choiceCancel(): void {//点击修改密码取消
    let that = this;
    that.password.modalShow = false;
    that.passwordForm = that.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, that.newPasswordOption]],
      surePassword: [null, [Validators.required, that.surePasswordOption]],
    });
  }
  // 生命周期函数
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
    this.passwordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, this.newPasswordOption]],
      surePassword: [null, [Validators.required, this.surePasswordOption]],
    });
  }

  ngDoCheck() {//页面监听（鼠标移动，键盘输入，触发）

  }

}
