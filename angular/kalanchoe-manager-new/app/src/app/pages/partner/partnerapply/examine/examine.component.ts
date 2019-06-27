
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { TransformService } from '../../../../shared/service/transform.service';
import { ApiService } from '../../../../shared/service/api.service';

@Component({
    selector: 'app-examine',
    templateUrl: './examine.component.html',
    styleUrls: ['./examine.component.css']
})
export class ExamineComponent implements OnInit {
    userid
    status
    remark
    applyInfo = {
        appUserId: '',
        applyTime: '',
        checkTime: '',
        checkUser: '',
        createDate: '',
        id: '',
        level: '',
        mode: '',
        remark: '',
        status: '',
        updateDate: ''
    }
    baseInfo = {
        address: '',
        createDate: '',
        education: '',
        groupId: '',
        groupName: '',
        guestUrl: '',
        headUrl: '',
        id: '',
        industry: '',
        inviteCode: '',
        inviteUrl: '',
        inviterId: '',
        inviterMobile: '',
        inviterUpperId: '',
        live: '',
        mobile: '',
        post: '',
        registerSource: '',
        registerTime: '',
        status: '',
        type: '',
        updateDate: '',
        workAge: '',
        realName: ''
    }
    statisticsInfo = {
        directCustomer: '',
        directCustomerOrderCount: '',
        directCustomerOrderSum: '',
        primaryCustomer: '',
        primaryCustomerOrderCount: '',
        primaryCustomerOrderSum: '',
        secondaryCustomer: '',
        secondaryCustomerOrderCount: '',
        secondaryCustomerOrderSum: ''
    }

    constructor(
        private api: ApiService,
        private dateTransform: TransformService,
        private route: ActivatedRoute,
        private router: Router,
        private message: NzMessageService
    ) {
    }

    ngOnInit() {
        this.userid = this.route.snapshot.queryParams.userid;
        this.getMessage()
    }

    async getMessage() {
        let res = await this.api.getPartner(this.userid);
        if (res.code == 200) {
            this.applyInfo = res.data.applyInfo;
            this.baseInfo = res.data.baseInfo;
            this.statisticsInfo = res.data.statisticsInfo;
            if (res.data.applyInfo.status == 0) {
                this.applyInfo.status = "未审核";
            }
            if (res.data.applyInfo.status == 1) {
                this.applyInfo.status = "审核通过";
            }
            if (res.data.applyInfo.status == 2) {
                this.applyInfo.status = "审核不通过";
            }
        }
    }

    back() {
        history.back();
    }

    async patchPartner(param) {
        let res = await this.api.patchPartner(param);
        if (res.code == "200") {
            this.message.success('审核成功')
            this.back()
        } else {
            this.message.error(res.reason)
        }
    }

    examine() {
        if (!this.status || this.status == "") {
            this.message.error('请选择审核结果')
            return false;
        }
        if (!this.remark || this.remark == "") {
            this.message.error('请选择审核原因')
            return false;
        }
        let params = [{
            id: this.applyInfo.id,
            appUserId: this.userid,
            status: Number(this.status),
            remark: this.remark
        }];

        this.patchPartner(params);
    }
}