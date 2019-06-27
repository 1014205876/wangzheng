import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { ApiService } from '../../../../shared/service/api.service';


@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
    userid
    pageNum = 1
    total = 0
    selectedBasic = true
    selectedCheck = false
    selectedLogin = false
    showBasicInm = true
    showCheckInm = false
    showLoginInm = false
    identificationInfo
    showidentificationInfo
    // 基本信息
    public telNum
    public avatar = '';
    public inviter
    public registrationSource
    public status
    public statusText
    public group
    public education
    public workTime
    public job
    public position
    public city

    // 认证信息
    public realName
    public sex
    public nation
    public birthday
    public idNum
    public address
    public expireDate
    public cerOrg
    public frontUrl
    public oppositeUrl

    list = []
    data = []

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
    ) { }

    ngOnInit() {
        this.userid = this.route.snapshot.queryParams.userid
        this.getDetailData()
        this.getLoginData()
    }
    async getDetailData() {
        let res = await this.api.getUserId(this.userid);
        this.identificationInfo = res.data.identificationInfo
        this.telNum = res.data.baseInfo.mobile
        if (res.data.baseInfo.status == 1) {
            this.statusText = '启用'
        } else {
            this.statusText = '禁用'
        }
        this.avatar = res.data.baseInfo.headUrl
        this.status = res.data.baseInfo.status
        if (res.data.baseInfo.inviterMobile == null) {
            this.inviter = '无'
        } else {
            this.inviter = res.data.baseInfo.inviterMobile //邀请人
        }
        
        //基本信息
        this.registrationSource = res.data.baseInfo.registerSource
        this.group = res.data.baseInfo.groupName //分组
        this.education = res.data.baseInfo.education //最高学历
        this.workTime = res.data.baseInfo.workAge ? res.data.baseInfo.workAge : ''
        this.job = res.data.baseInfo.industry//当前所在行业
        this.city = res.data.baseInfo.live
        this.position = res.data.baseInfo.post//当前所在岗位

        //认证信息
        this.realName = res.data.identificationInfo.realName
        this.sex = res.data.identificationInfo.sex
        this.nation = res.data.identificationInfo.nation
        this.birthday = res.data.identificationInfo.birthday
        this.idNum = res.data.identificationInfo.idNum
        this.address = res.data.identificationInfo.address
        this.expireDate = res.data.identificationInfo.expireDate
        this.cerOrg = res.data.identificationInfo.cerOrg
        this.frontUrl = res.data.identificationInfo.frontUrl
        this.oppositeUrl = res.data.identificationInfo.oppositeUrl
    }
    async getLoginData() {
        let res = await this.api.getUserLogDataGrid(
            this.userid,
            {
                pageNum: this.pageNum,
                pageSize: 10
            }
        );
        if (res.code == 200) {
            this.total = res.data.total
            this.list = res.data.list
            this.addIndexList()
        }
    }
    addIndexList() {
        var list = this.list
        var List = list.map((item, index) => {
            item['index'] = (this.pageNum - 1) * 10 + index + 1
            return item
        })
        this.data = List
    }
    pageSearch($event) {
        this.pageNum = $event
        this.getLoginData()
    }

    showBasic() {
        this.showBasicInm = true;
        this.showCheckInm = false;
        this.showLoginInm = false;
        this.selectedBasic = true;
        this.selectedCheck = false;
        this.selectedLogin = false;
        this.showidentificationInfo = false;
    }
    showCheck() {
        if (this.identificationInfo == null) {
            this.showBasicInm = false
            this.showCheckInm = false;
            this.showLoginInm = false;
            this.selectedBasic = false;
            this.selectedCheck = true;
            this.selectedLogin = false;
            this.showidentificationInfo = true
        } else {
            this.showBasicInm = false;
            this.showCheckInm = true;
            this.showLoginInm = false;
            this.selectedBasic = false;
            this.selectedCheck = true;
            this.selectedLogin = false;
            this.showidentificationInfo = false;
        }
    }
    showLogin() {
        this.showBasicInm = false;
        this.showCheckInm = false;
        this.showLoginInm = true;
        this.selectedBasic = false;
        this.selectedCheck = false;
        this.selectedLogin = true;
        this.showidentificationInfo = false;
    }

}
