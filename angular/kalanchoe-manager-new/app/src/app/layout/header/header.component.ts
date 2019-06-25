import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { NzMessageService, NzModalService } from 'ng-zorro-antd';

// import { HttpServe } from '../../shared/service/http-serve.service';
import { ApiService } from '../../shared/service/api.service';
import resource from "../../layout/resource/resource";

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

    constructor(
        private api: ApiService,
        private fb: FormBuilder,
        private message: NzMessageService,
        private modalService: NzModalService
    ) { }
    ngOnInit() {
        // 修改密码的表单
        this.resetPwd = this.fb.group({
            oldPassword: [null, [Validators.required]],
            newPassword: [null, [Validators.required]],
            checkPassword: [null, [Validators.required, this.confirmationValidator]]
        });
        this.getHeader()
    }

    getHeader() {
        console.log('header')
        if (resource.over) {//防止权限接口返回过慢导致获取到的权限数组为空
            this.nav = resource.nav;
            this.userInfor = resource.currentUser;
        } else {
            setTimeout(() => {
                this.getHeader()
            }, 100);
        }
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


    async changePassword(value) {
        let res = await this.api.changePassword(
            this.userInfor.account,
            {
                "oldPassword": value.oldPassword,//旧密码
                "newPassword": value.newPassword,//新密码
            }
        )
        if (res.code == 200) {
            this.password.modalShow = false;
            this.password.modalLoading = false;
            this.resetPwd.reset();
            this.message.create('success', '密码修改成功，即将重新登录', { nzDuration: 5000 });
            setTimeout(() => {
                this.logout()
            }, 3000);
        } else {
            this.message.create('error', res.reason, { nzDuration: 5000 })
        }
    }

    // 确定按钮 提交表单
    choiceOk(): void {
        for (const i in this.resetPwd.controls) {
            this.resetPwd.controls[i].markAsDirty();
            this.resetPwd.controls[i].updateValueAndValidity();
        }
        if (this.resetPwd.valid) {
            this.password.modalLoading = true;
            let value = this.resetPwd.value;
            this.changePassword(value);
            // this.http.patch(
            //     'peak-resource/v1/resource/user/pass/' + this.userInfor.account,
            //     {
            //         "oldPassword": value.oldPassword,//旧密码
            //         "newPassword": value.newPassword,//新密码
            //     }
            // ).then(
            //     () => {
            //         this.password.modalShow = false;
            //         this.password.modalLoading = false;
            //         this.resetPwd.reset();
            //         this.message.create('success', '密码修改成功，即将重新登录', { nzDuration: 5000 });
            //         setTimeout(() => {
            //             this.logout()
            //         }, 3000);
            //     },
            //     (error) => {
            //         this.message.create('error', error, { nzDuration: 5000 })
            //     }
            // )
        }
    }

    // 取消按钮 关闭弹窗
    choiceCancel(): void {
        this.password.modalShow = false;
        this.resetPwd.reset();
    }

    // 新密码和确认密码一致性校验
    updateConfirmValidator(): void {
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
