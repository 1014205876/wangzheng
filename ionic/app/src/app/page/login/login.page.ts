import { Component, OnInit } from '@angular/core';
import { selfHttp } from '../../shared/service/http-service';
import { FormGroup } from '@angular/forms'
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginForm: FormGroup
    public yzm = false
    public sendCd = 60
    public insStaffNum

    items = {
        mobile: '',
        yzm: ''
    }

    constructor(
        private http: selfHttp,
    ) {
        // this.loginForm = new FormGroup({
        // 	mobile: new FormControl('', Validators.pattern(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$/)),
        // 	yzm: new FormControl()
        // })
        // this.activeRoute.queryParams.subscribe((e) => {
        // 	this.insStaffNum = e.insStaffNum
        // })
    }

    ngOnInit() {
    }

    getYzm() {
        if (!this.items.mobile) {
            alert('请先输入手机号')
            return
        }
        if (!this.loginForm.controls.mobile.valid) {
            alert('请输入正确的手机号')
            return
        }

        // let _this=this;
        let _this1 = this
        let count = 60
        this.sendCd
        this.yzm = true
        let params = {
            mobile: this.items.mobile
        }
        // this.http.smsCode(params).subscribe()
        // let timeId = setInterval(function() {
        // 	_this1.sendCd = --count
        // 	if (count < 0) {
        // 		_this1.yzm = false
        // 		_this1.sendCd = 60
        // 		clearInterval(timeId)
        // 	}
        // }, 1000)
    }

    checkYzm() {
        let params = {
            mobile: this.items.mobile,
            yzm: this.items.yzm
        }
        // if (common.validatePhoneNumber(params.mobile)) {
        // 	this.addUser()
        // } else {
        // 	alert('手机号码格式不正确')
        // }

        // this.http.verSmsCode(params).subscribe((res) => {
        // 	if (res.code == '200') {
        // 		this.cookie.put('Template', this.items.mobile, { expires: new Date(new Date().getTime() + 2505600000) })
        // 		this.addUser()
        // 		storage.set('token', res.result.data)
        // 	} else {
        // 		alert(res.reason)
        // 		return
        // 	}
        // })
    }

    addUser() {
        let insStaffNum = this.insStaffNum ? this.insStaffNum : {}
        // let params = { smsCode: this.items.yzm, mobile: this.items.mobile }
        // params = Object.assign({},insStaffNum, params)
        // this.http.login(params).subscribe((res) => {
        // 	if (res.code == '200') {
        // 		storage.set('token', res.result.token)
        // 		this.router.navigate([ '/home' ])
        // 	} else {
        // 		alert(res.reason)
        // 	}
        // })
    }

    onSubmit() { }
}
