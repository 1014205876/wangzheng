import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { HttpServe } from '../../../../shared/service/http-serve.service';
import { ApiService } from '../../../../shared/service/api.service';

@Component({
    selector: 'app-partnerdetail',
    templateUrl: './partnerdetail.component.html',
    styleUrls: ['./partnerdetail.component.css']
})
export class PartnerdetailComponent implements OnInit {
    userid
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
        private route: ActivatedRoute,
        private api: ApiService,
    ) { }

    ngOnInit() {
        this.userid = this.route.snapshot.queryParams.userid;
        this.getMessage()
    }

    back() {
        history.back();
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

}
