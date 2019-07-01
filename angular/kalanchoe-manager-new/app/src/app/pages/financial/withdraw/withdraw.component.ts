import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { TransformService } from '../../../shared/service/transform.service';
import { ApiService } from '../../../shared/service/api.service';

@Component({
    selector: 'app-withdraw',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.less']
})
export class WithdrawComponent implements OnInit {
    open = false;//控制多余查询框的展开收起
    startTime: Date = null;
    endTime: Date = null;

    //查找变量
    findNo = ''
    findPhone = ''
    findStartTime = '';
    findEndTime = '';

    //按钮组状态
    groupStatus = '&states=0&states=1&states=2&states=3&states=4'
    groupText = [
        {
            label: '全部',
            value: '&states=0&states=1&states=2&states=3&states=4'
        },
        {
            label: '处理中',
            value: '&states=0&states=1'
        },
        {
            label: '提现成功',
            value: '&states=3'
        },
        {
            label: '提现失败',
            value: '&states=2&states=4'
        }
    ]
    //分页
    pageNum = 1
    total = 0

    //表格
    displayData: any[] = [];

    disabledStartTime = (startTime: Date): boolean => {
        if (!startTime || !this.endTime) {
            return false;
        }
        return startTime.getTime() > this.endTime.getTime();
    };

    disabledEndTime = (endTime: Date): boolean => {
        if (!endTime || !this.startTime) {
            return false;
        }
        return endTime.getTime() <= this.startTime.getTime();
    };

    constructor(
        private api: ApiService,
        private message: NzMessageService,
        private dateTransform: TransformService,
    ) {
    }

    ngOnInit() {
        this.getData();
    }

    onStartTimeChange(date: Date): void {
        this.findStartTime = date ? this.dateTransform.timeFormat("yyyy-MM-dd 00:00:00", date) : '';
    }

    onEndTimeChange(date: Date): void {
        this.findEndTime = date ? this.dateTransform.timeFormat("yyyy-MM-dd 23:59:59", date) : '';
    }

    async getData() {
        let res = await this.api.getBackAppCashs(
            '?pageNum=' + this.pageNum +
            '&pageSize=' + 10 +
            '&applyNo=' + this.findNo +
            '&mobile=' + this.findPhone +
            '&createStartTime=' + this.findStartTime +
            '&createEndTime=' + this.findEndTime +
            this.groupStatus
        );
        if (res.code == 200) {
            this.total = res.data.total;
            this.pageNum = res.data.pageNum;
            this.displayData = res.data.list
        }
    }

    search() {
        this.pageNum = 1;
        this.getData();
    }

    reset() {
        this.findNo = ''
        this.findPhone = ''
        this.findStartTime = ''
        this.findEndTime = ''
        this.startTime = null
        this.endTime = null
        this.pageNum = 1
    }

    changeState() {
        this.pageNum = 1;
        this.getData();
    }

    pageSearch($event) {
        this.pageNum = $event;
        this.getData();
    }
}
