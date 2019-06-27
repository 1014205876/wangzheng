import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TransformService } from '../../../../shared/service/transform.service';
import { ApiService } from '../../../../shared/service/api.service';

@Component({
    selector: 'app-partner',
    templateUrl: './partner.component.html',
    styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
    open = false;//控制多余查询框的展开收起
    startValue: Date = null;
    endValue: Date = null;
    startOpen: boolean = false;
    endOpen: boolean = false;
    total = 0
    pageNum = 1

    data = []
    list = []
    //查询变量
    findPhone = ''
    findRegisterSource = ''
    findConnect = ''
    wantStartTime = ''
    wantEndTime = ''

    //接收路由参数
    userId
    userTle

    //普通创客、合伙人
    normalMaker
    countPartner
    constructor(
        private api: ApiService,
        private dateTransform: TransformService,
        private route: ActivatedRoute,

    ) { }

    ngOnInit() {
        this.userId = this.route.snapshot.queryParams.userid;
        this.userTle = this.route.snapshot.queryParams.userTle;
        this.getData()
        this.getPatNum()
    }
    async getData() {
        let res = await this.api.getDistributionPartnerDataGrid({
            mobile: this.findPhone,
            registerTimeStart: this.wantStartTime,
            registerTimeEnd: this.wantEndTime,
            registerSource: this.findRegisterSource,
            releation: this.findConnect,
            userId: this.userId,
            pageNum: this.pageNum,
            pageSize: 10
        });
        if (res.code == 200) {
            this.list = res.data.list
            this.total = res.data.total
            this.addIndexList()
        }
    }
    async getPatNum() {
        let res = await this.api.getUserType({
            id: this.userId
        });
        if (res.code == 200) {
            this.normalMaker = res.data.total
            this.countPartner = res.data.countPartner
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

    search() {
        this.pageNum = 1
        this.getData()
    }
    reset() {
        this.findPhone = ''
        this.findRegisterSource = ''
        this.findConnect = ''
        this.startValue = null
        this.endValue = null
        this.wantStartTime = ''
        this.wantEndTime = ''
    }
    pageSearch($event) {
        this.pageNum = $event
        this.getData()
    }
    //card one
    disabledStartDate = (startValue: Date): boolean => {
        if (!startValue || !this.endValue) {
            return false;
        }
        return startValue.getTime() > this.endValue.getTime();
    };

    disabledEndDate = (endValue: Date): boolean => {
        if (!endValue || !this.startValue) {
            return false;
        }
        return endValue.getTime() <= this.startValue.getTime();
    };

    onStartChange(date: Date): void {
        this.startValue = date
        this.wantStartTime = this.dateTransform.timeFormat("yyyy-MM-dd 00:00:00", date)
    }

    onEndChange(date: Date): void {
        this.endValue = date
        this.wantEndTime = this.dateTransform.timeFormat("yyyy-MM-dd 23:59:59", date)
    }

    handleStartOpenChange(open: boolean): void {
        this.startOpen = open;
        if (open) {
            this.endOpen = false;
        } else {
            this.endOpen = true;
        }
    }

    handleEndOpenChange(open: boolean): void {
        this.endOpen = open;
        if (open) {
            this.startOpen = false;
        }
    }
}
