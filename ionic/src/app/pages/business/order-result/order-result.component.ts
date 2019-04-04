import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../shared/service/http-serve.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTransformService } from '../../../shared/service/date-transform.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-order-result',
    templateUrl: './order-result.component.html',
    styleUrls: ['./order-result.component.less']
})
export class OrderResultComponent implements OnInit {

    constructor(
        private http: HttpService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private dateTransform: DateTransformService,
        private message: NzMessageService
    ) {
    }

    id;
    productId;
    loanApply = {//基本信息对象
        no: "",//订单号
        status: "",//订单状态
        controllerName: "",//客户名称
        productName: "",//申请产品
        amount: "",//申请贷款金额
        term: "",//申请贷款期限
        repayMethod: "",//还款方式
    };
    repayMethodArr = [];//还款方式数组
    formData: FormGroup;
    form = {//结果信息对象
        status: '2',//操作
        reason: '',//终止原因
        approvalAmount: '',//批复金额
        approvalTerm: '',//批复期限
        loanRate: '',//批复利率
        repayMethod: '',//还款方式
        serviceRate: '',//居间服务费率
        no: '',//合同编号
        loanDate: '',//放款时间
    };
    canSubmit = false;//结果是否可提交
    date = null;//放款时间时间对象

    goBack() {//返回上一页
        history.back();
    }

    submitForm = ($event) => {//表单提交函数
        let that=this;
        $event.preventDefault();
        for (const key in this.formData.controls) {
            this.formData.controls[key].markAsDirty();
            this.formData.controls[key].updateValueAndValidity();
        }
        console.log(this.form)
        let data;
        if (this.form.status == '1') {
            data = {
                loanId: this.id,
                status: 1,
                reason: this.form.reason
            }
        }
        if (this.form.status == '2') {
            data = {
                loanId: this.id,
                status: 2,
                approvalAmount: this.form.approvalAmount,
                approvalTerm: this.form.approvalTerm,
                loanRate: this.form.loanRate,
                repayMethod: this.form.repayMethod,
                serviceRate: this.form.serviceRate,
                no: this.form.no,
                loanDate: this.form.loanDate,
            }
        }
        console.log(data)
        this.http.postCustomHeaders(
            '/v1/app/back/loan/result',
            data
        ).subscribe(res => {
            console.log(res);
            if (res.code == 200) {
                that.message.create('success', `保存结果成功`, { nzDuration: 2000 });
                that.goBack();
              } else {
                that.message.create('error', `保存结果失败，${res.reason}`, {});
              }
        })
    }

    dateFtt(fmt, date) { //时间格式化函数 
        var o = {
            "M+": date.getMonth() + 1,                      //月份   
            "d+": date.getDate(),                           //日   
            "h+": date.getHours(),                          //小时   
            "m+": date.getMinutes(),                        //分   
            "s+": date.getSeconds(),                        //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3),    //季度   
            "S": date.getMilliseconds()                     //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    onChange(event) {//选择时间时把时间格式化
        if (event) {
            this.form.loanDate = this.dateFtt("yyyy-MM-dd hh:mm:ss", event)
        }
    }

    ngOnInit() {
        let that = this;
        this.id = this.route.snapshot.queryParams.id;
        this.productId = this.route.snapshot.queryParams.productId;
        that.http.getCustomHeaders("/v1/app/back/loans/" + that.id)
            .subscribe(res => {
                console.log(res);
                that.loanApply = res.result.loanApply;
            });
        that.http.getCustomHeaders3("guest-client/v2/app/pre/repayMethod/" + that.productId)
            .subscribe(res => {
                console.log(res);
                that.repayMethodArr = res.result;
            });
        this.formData = this.fb.group({
            status: [this.form.status, [Validators.required]],
            reason: [this.form.reason, [Validators.required]],
            approvalAmount: [this.form.approvalAmount, [Validators.required]],
            approvalTerm: [this.form.approvalTerm, [Validators.required]],
            loanRate: [this.form.loanRate, [Validators.required]],
            repayMethod: [this.form.repayMethod, [Validators.required]],
            serviceRate: [this.form.serviceRate],
            no: [this.form.no],
            loanDate: [this.form.loanDate],
        });
    }


    ngDoCheck() {//页面监听（鼠标移动，键盘输入，触发）
        if (this.form.status == '2') {
            if (this.form.approvalAmount) {
                if (this.form.approvalTerm) {
                    if (this.form.loanRate) {
                        if (this.form.repayMethod) {
                            this.canSubmit = false;
                        } else {
                            this.canSubmit = true;
                        }
                    } else {
                        this.canSubmit = true;
                    }
                } else {
                    this.canSubmit = true;
                }
            } else {
                this.canSubmit = true;
            }
        }
        if (this.form.status == '1') {
            if (this.form.reason) {
                this.canSubmit = false;
            } else {
                this.canSubmit = true;
            }
        }
    }
}
