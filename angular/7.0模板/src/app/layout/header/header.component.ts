import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd';

import { ApiService } from '../../shared/service/api.service';
import resource from '../../shared/resource';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
    public nav: any = [//其他平台页面跳转数据
        {
            appAddress: "https://www.baidu.com",
            appName: "百度",
        },
        {
            appAddress: "https://github.com/",
            appName: "github",
        },
    ];

    public userInfo: any = {//用户信息
        name: resource.userInfo.name,
        account: resource.userInfo.userName,
    };//用户信息
    public password: any = {//修改密码弹窗
        popoverShow: false,
        modalShow: false,
        modalLoading: false,
        submitDisable: false,
    };//修改密码弹窗
    passwordForm: FormGroup;//修改密码表单

    constructor(
        private api: ApiService,
        private fb: FormBuilder,
        private message: NzMessageService
    ) {
    }

    // 生命周期函数
    ngOnInit() {
        this.passwordForm = this.fb.group({
            oldPassword: [null, [Validators.required]],
            newPassword: [null, [Validators.required, this.newPasswordOption]],
            surePassword: [null, [Validators.required, this.surePasswordOption]],
        });
    }

    async logout() {//退出登录
        let res = await this.api.postLogOut();
        if (res.code == 200) {
            this.userInfo.name = '未登录';
            resource.userInfo.name = '未登录';
            this.userInfo.userName = '';
            resource.userInfo.userName = '';
        }
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

    paddr() {
    }

    choiceOk() {
    }

    choiceCancel(): void {//点击修改密码取消
        let that = this;
        that.password.modalShow = false;
        // this.passwordForm.get('oldPassword').setValue('')
        // this.passwordForm.get('newPassword').setValue('')
        // this.passwordForm.get('surePassword').setValue('')
        that.passwordForm = that.fb.group({
            oldPassword: [null, [Validators.required]],
            newPassword: [null, [Validators.required, that.newPasswordOption]],
            surePassword: [null, [Validators.required, that.surePasswordOption]],
        });
    }

}
