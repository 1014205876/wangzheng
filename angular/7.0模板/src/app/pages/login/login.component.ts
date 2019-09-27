import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { ApiService } from '../../shared/service/api.service';
import resource from '../../shared/resource';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    @ViewChild("appCode") appCode;//图像验证码组件

    public passwordVisible = false;//密码是否可见
    public imageCode = '';//图形验证码，用于前端核对
    public gvCodeWidth;//图形验证码组件宽度
    public gvCodeHeight;//图形验证码组件高度
    public sendCd = 0;//获取短信按钮倒数秒数
    public timeInt;//倒数时候触发的计时器
    public form = {//form表单对象
        type: 0,//登录方式
        btnDisabled: true,//按钮获取短信按钮是否被禁用
        userName: '',//手机号
        password: '',//密码
        uuid: '',//uuid（后端获取，前端不展示，登录时发给后端）
        imageCode: '',//图形二维码，（前端校验正确才可登录，同时发给后端做二次校验）
        smsCode: '',//短信验证码
    };
    public submitLoading = false;
    public inputChange = new InputChange();

    constructor(
        private el: ElementRef,
        private router: Router,
        private api: ApiService,
        private message: NzMessageService
    ) { }

    ngOnInit() {
        this.canvasInit();
        this.getgvCode();
        let phone = navigator.userAgent;
        let xitong = phone.match(/((\S*))/);
    }

    ngOnDestroy() {//离开页面时销毁
        clearInterval(this.timeInt);
    }

    canvasInit() {
        this.gvCodeWidth = this.el.nativeElement.querySelectorAll(".btn")[0].clientWidth;
        this.gvCodeHeight = this.el.nativeElement.querySelectorAll(".btn")[0].clientHeight;
    }

    getgvCode() {
        let numArr = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z'
        ];
        
        setTimeout(() => {
            this.imageCode = 'abcd'
            this.appCode.drawPic('abcd')
        }, 0)
    }

    codeChange(event) {
        if (this.imageCode.toLowerCase() == this.form.imageCode.toLowerCase()) {
            this.form.btnDisabled = false
        } else {
            this.form.btnDisabled = true
        }
    }

    async formSubmit() {
        let reg = /^1[0-9]{10}$/;
        if (!reg.test(this.form.userName)) {
            this.message.error('请输入正确的手机号!');
            return;
        }
        this.submitLoading = true;
        let res = await this.api.login(this.form);
        if (res.code == 200) {
            resource.userInfo = res.data;
            this.message.success('登录成功!');
            this.router.navigate(['/home']);
        } else {
            this.message.error(res.reason);
            this.getgvCode()
        }
        this.submitLoading = false;
    }
}

class InputChange {
    constructor(
        public userName = false,
        public imageCode = false,
        public password = false
    ) { }
}