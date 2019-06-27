import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TransformService } from '../../../../shared/service/transform.service';
import { ApiService } from '../../../../shared/service/api.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    open = false;//控制多余查询框的展开收起
    startValue: Date = null;
    endValue: Date = null;
    startOpen: boolean = false;
    endOpen: boolean = false;
    total = 0

    //查询变量
    findPhone = ''
    findEtpName = ''
    findNo = ''
    findStatus = ''
    wantStartTime = ''
    wantEndTime = ''
    findProductId = ''
    findReleation = ''
    pageNum = 1
    //路由接收参数
    userId
    phone

    //所有产品
    productList = []

    data = []
    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private dateTransform: TransformService,
    ) { }

    ngOnInit() {
        this.userId = this.route.snapshot.queryParams.userid
        this.phone = this.route.snapshot.queryParams.userTle
        this.getData()
        this.getPatNum()
    }
    async getData() {
        let res = await this.api.getDistributionOrderDataGrid({
            mobile: this.findPhone,
            createTimeStart: this.wantStartTime,
            createTimeEnd: this.wantEndTime,
            etpName: this.findEtpName,
            status: this.findStatus,
            no: this.findNo,
            releation: this.findReleation,
            productId: this.findProductId,
            userId: this.userId,
            pageNum: this.pageNum,
            pageSize: 10
        });
        if (res.code == 200) {
            this.data = res.data.list
            this.total = res.data.total
        }
    }
    async getPatNum() {
        let res = await this.api.getProduct();
        if (res.code == 200) {
            this.productList = res.data;
        }
    }
    search() {
        this.pageNum = 1;
        this.getData();
    }
    reset() {
        this.findPhone = ''
        this.findEtpName = ''
        this.findNo = ''
        this.findStatus = ''
        this.findProductId = ''
        this.findReleation = ''
        this.startValue = null
        this.endValue = null
        this.wantStartTime = ''
        this.wantEndTime = ''
    }
    pageSearch($event) {
        this.pageNum = $event
        this.getData()
    }

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
