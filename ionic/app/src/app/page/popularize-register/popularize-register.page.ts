import { Component, OnInit } from '@angular/core';
import { selfHttp } from '../../shared/service/http-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-popularize-register',
    templateUrl: './popularize-register.page.html',
    styleUrls: ['./popularize-register.page.scss'],
})
export class PopularizeRegisterPage implements OnInit {

    public yzm = false
    public sendCd = 60
    public insStaffNum: any//邀请人

    items = {
        mobile: '',
        yzm: ''
    }

    constructor(
        private http: selfHttp,
        public router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.activeRoute.queryParams.subscribe((e) => {
            this.insStaffNum = e || {}
        })
    }

    ngOnInit() {
    }

    getYzm() {//发送验证码
        let that = this;
        let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$/;
        if (!this.items.mobile) {
            alert('请先输入手机号')
            return
        }
        if (!reg.test(this.items.mobile)) {
            alert('请输入正确的手机号')
            return
        }

        let count = 60
        this.sendCd
        this.yzm = true
        this.http.get(
            '/interface/v1/smsCode/' + this.items.mobile,
            res => {
                if (res.code == 200) {
                    let timeId = setInterval(function () {
                        that.sendCd = --count
                        if (count < 0) {
                            that.yzm = false
                            that.sendCd = 60
                            clearInterval(timeId)
                        }
                    }, 1000)
                } else {
                    alert(res.reason)
                }
            }
        );
    }

    checkYzm() {//点击登录
        let that = this;
        let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$/;
        if (!this.items.mobile) {
            alert('请先输入手机号')
            return
        }
        if (!reg.test(this.items.mobile)) {
            alert('请输入正确的手机号')
            return
        }
        if (!this.items.yzm) {
            alert('请输入验证码')
            return
        }
        let params = { smsCode: this.items.yzm, mobile: this.items.mobile }
        params = Object.assign({}, this.insStaffNum, params)
        this.http.login(
            '/auth/login',
            params,
            res => {
                if (res.code == '200') {
                    localStorage.setItem('token', JSON.stringify(res.result.token))
                    that.router.navigate(['/home'],
                        {
                            queryParams: that.insStaffNum
                        }
                    )
                }else{
                    alert(res.reason)
                }
            }
        );
    }

}
