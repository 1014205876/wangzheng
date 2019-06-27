import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TransformService } from '../../../../shared/service/transform.service';
import { ApiService } from '../../../../shared/service/api.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    startValue: Date = null;
    endValue: Date = null;
    startOpen: boolean = false;
    endOpen: boolean = false;
    total = 0
    //接收路由参数
    userId
    userTle

    //查询变量
    findPhone = ''
    wantStartTime = ''
    wantEndTime = ''
    findRegisterSource = ''
    findConnect = ''
    pageNum = 1

    data = []
    list = []
    constructor(
        private api: ApiService,
        private dateTransform: TransformService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.userId = this.route.snapshot.queryParams.userid;
        this.userTle = this.route.snapshot.queryParams.userTle
        this.getData()
    }
    async getData() {
        let res = await this.api.getDistributionUserDataGrid({
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
        this.wantEndTime = ''
        this.wantStartTime = ''
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
