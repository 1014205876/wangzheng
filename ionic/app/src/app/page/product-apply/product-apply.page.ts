import { Component, OnInit } from '@angular/core';
import { selfHttp } from '../../shared/service/http-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-product-apply',
    templateUrl: './product-apply.page.html',
    styleUrls: ['./product-apply.page.scss'],
})
export class ProductApplyPage implements OnInit {
    productMes = {//产品信息
        name: '',
        productTypeName: '',
        minAmount: '',
        maxAmount: '',
        minTerm: '',
        maxTerm: '',
        minRate: '',
        maxRate: ''
    }
    items = {//form表单
        mobile: '',
        yzm: '',
    }
    public yzm = false;//验证码按钮是否可用
    public sendCd = 60;//定时器
    public insStaffNum;//页面传参

    constructor(
        private http: selfHttp,
        public router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.activeRoute.queryParams.subscribe((e) => {
            this.insStaffNum = e
        })
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
            '/guest-client/v2/app/pre/smsCode?mobile=' + this.items.mobile,
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
        let insStaffNum = this.insStaffNum ? this.insStaffNum : {}
        let params = { smsCode: this.items.yzm, mobile: this.items.mobile }
        params = Object.assign({}, insStaffNum, params)
        this.http.login(
            '/auth/login',
            params,
            res => {
                if (res.code == '200') {
                    localStorage.setItem('token', JSON.stringify(res.result.token))
                    console.log({
                        id: that.insStaffNum.productId,
                        name: that.productMes.name
                    })
                    that.router.navigate(['/home'], {
                        queryParams: {
                            id: that.insStaffNum.productId,
                            name: that.productMes.name
                        }
                    })
                }
            }
        );
    }

    ngOnInit() {
        let that = this;
        this.http.get(//获取产品信息
            '/guest-client/v2/app/pre/product/' + this.insStaffNum.productId,
            res => {
                that.productMes = res.result
            }
        );
    }
}
