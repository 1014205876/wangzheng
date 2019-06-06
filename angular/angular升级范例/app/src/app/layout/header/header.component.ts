import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/http-serve/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import resource from '../menu-items/resource'
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'

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

  public password: any = {
    popoverShow: false,
    modalShow: false,
    modalLoading: false,
    oldPassword: 123,
    newPassword: 456
  };//修改密码弹窗

  resetPwd: FormGroup;
  platformInfo = environment


  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modalService: NzModalService,
    private router: Router
  ) { }
  ngOnInit() {
    // 修改密码的表单
    this.resetPwd = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });
    //登录状态信息
    this.api.getAppsPermission().then(res => {
      this.nav = res
    })
    //其他巅峰平台链接跳转
    this.api.getCurrentUserInfo().then(res => {
      resource.currentUser = res
      this.userInfor = res
    })
  }

  showConfirm(confMessage): void {
    this.modalService.confirm({
      nzTitle: '<i>提示</i>',
      nzContent: '<b>' + confMessage + '</b>',
      nzOnOk: () => this.logout()
    });
  }

  logout() {//退出登录
    window.location.href = window.location.protocol + '//' + window.location.host + '/logout';
  }
  cancel() { }

  // 确定按钮 提交表单
  choiceOk(): void {
    for (const i in this.resetPwd.controls) {
      this.resetPwd.controls[i].markAsDirty();
      this.resetPwd.controls[i].updateValueAndValidity();
    }
    if (this.resetPwd.valid) {
      this.password.modalLoading = true;
      let value = this.resetPwd.value;
      this.api.updatePassword(
        this.userInfor.account,
        {
          oldPassword: value.oldPassword,//旧密码
          newPassword: value.newPassword,//新密码
        }
      ).then(res => {
        if (res) {
          this.password.modalShow = false;
          this.password.modalLoading = false;
          this.resetPwd.reset();
          this.message.create('success', '密码修改成功，即将重新登录', { nzDuration: 5000 })
          setTimeout(() => {
            this.logout()
          }, 3000);
        }
      })
    }
  }

  // 取消按钮 关闭弹窗
  choiceCancel(): void {
    this.password.modalShow = false;
    this.resetPwd.reset();
  }

  // 新密码和确认密码一致性校验
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.resetPwd.controls.checkPassword.updateValueAndValidity());
  }
  // 新密码和确认密码一致性校验
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.resetPwd.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
  }

}
