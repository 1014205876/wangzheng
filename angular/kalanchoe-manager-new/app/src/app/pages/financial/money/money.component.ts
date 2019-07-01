import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { NzMessageService } from 'ng-zorro-antd';

import { ApiService } from '../../../shared/service/api.service';

@Component({
    selector: 'app-money',
    templateUrl: './money.component.html',
    styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {
    total = 0;
    pageNum = 1
    //查找变量
    findPhone = ''
    data = []
    mobile
    //调整modal
    showReconciliation = false
    //调整参数
    radiovalue = '1'
    //调整假数据
    adjugeAccount = ''
    availableMoney = ''
    availableCommissions = ''
    availableBonuses = ''
    selectAccount = '1'
    accountText = ''
    beforeAccount = ''
    afterAccount = ''
    showCheckMoadl = false
    adjugecheckAccount = ''
    selectText = '余额账户'
    adjugeReason = ''
    constructor(
        private api: ApiService,
        private message: NzMessageService,
        private route: ActivatedRoute,

    ) { }

    ngOnInit() {
        if (this.route.snapshot.queryParams.userTle) {
            this.findPhone = this.route.snapshot.queryParams.userTle
        }
        this.getData()
    }
    async getData() {
        let res = await this.api.getDataGrid({
            mobile: this.findPhone,
            pageNum: this.pageNum,
            pageSize: 10
        })
        if (res.code == 200) {
            this.data = res.data.list
            this.total = res.data.total
        }
    }
    search() {
        this.pageNum = 1
        this.getData()
    }
    reset() {
        this.findPhone = ''
    }
    //调账
    clickedReconciliation(mobile, availableVacancy) {
        this.mobile = mobile
        this.showReconciliation = true
        this.availableMoney = availableVacancy
        this.getCount(1)
    }
    //选择获取账户余额（余额，佣金，奖金）
    async getCount(type) {
        let res = await this.api.getDeployShow({
            mobile: this.mobile,
            type: type
        })
        if (res.code == 200) {
            if (type == '1') {
                this.availableMoney = res.data.canAccount
            }
            if (type == '2') {
                this.availableCommissions = res.data.canAccount
            }
            if (type == '3') {
                this.availableBonuses = res.data.canAccount
            }
        }
    }
    reconciliationCancel() {
        this.showReconciliation = false
        this.clearData()
    }
    reconciliationOk() {
        if (this.adjugeAccount != '' && this.adjugeReason != '') {
            this.computeAccountText()
            this.computeAccount()
        }
        else {
            this.message.error('金额与事由均不能为空！')
        }


    }
    //关闭modal 回归默认
    clearData() {
        this.availableMoney = ''
        this.availableCommissions = ''
        this.availableBonuses = ''
        this.selectAccount = '1'
        this.selectText = '余额账户'
        this.radiovalue = '1'
        this.adjugeAccount = ''
        this.adjugeReason = ''
        this.showCheckMoadl = false
        this.showReconciliation = false
    }
    //判断正负，计算余额
    computeAccount() {
        let adjugeAccount = this.adjugeAccount
        if (this.radiovalue == '1') {
            this.adjugecheckAccount = `+${adjugeAccount}`
            this.afterAccount = (Number(this.beforeAccount) + Number(adjugeAccount)).toString()
            this.showCheckMoadl = true
        }
        if (this.radiovalue == '0') {
            let afterAccount = Number(this.beforeAccount) - Number(adjugeAccount)
            if (afterAccount >= 0) {
                this.adjugecheckAccount = `-${adjugeAccount}`
                this.afterAccount = (Number(this.beforeAccount) - Number(adjugeAccount)).toString()
                this.showCheckMoadl = true
            }
            else {
                this.message.error('调减金额大于余额总数！')
                return
            }
        }
    }
    //动态显示计算前后的账户金额
    computeAccountText() {
        if (this.selectAccount == '1') {
            if (this.availableMoney == null) {
                this.beforeAccount = '0'
            }
            else {
                this.beforeAccount = this.availableMoney
            }
            this.selectText = '余额账户'
        }
        if (this.selectAccount == '2') {
            if (this.availableCommissions == null) {
                this.beforeAccount = '0'
            }
            else {
                this.beforeAccount = this.availableCommissions
            }
            this.selectText = '佣金账户'
        }
        if (this.selectAccount == '3') {
            if (this.availableBonuses == null) {
                this.beforeAccount = '0'
            }
            else {
                this.beforeAccount = this.availableBonuses
            }
            this.selectText = '奖金账户'
        }
    }

    //提交
    clickedcheckCancel() {
        this.showCheckMoadl = false
    }

    async clickedcheckOk() {
        let method
        let type = this.selectAccount
        let account = this.adjugeAccount
        let mobile = this.mobile
        let remark = this.adjugeReason
        if (this.radiovalue == '1') {
            method = 'add'
        }
        if (this.radiovalue == '0') {
            method = 'minus'
        }
        let res = await this.api.postDeploy({
            type: type,
            mobile: mobile,
            account: account,
            remark: remark,
            method: method
        });
        if (res.code == '200') {
            this.message.success('调账成功')
        } else {
            this.message.error(res.reason);
        }
        this.getData()
        this.clearData()
    }

    pageSearch($event) {
        this.pageNum = $event
        this.getData()
    }
}
