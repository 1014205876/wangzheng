import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { NzMessageService } from 'ng-zorro-antd';

import { TransformService } from '../../../shared/service/transform.service';
import { ApiService } from '../../../shared/service/api.service';

@Component({
    selector: 'app-articleupload',
    templateUrl: './articleupload.component.html',
    styleUrls: ['./articleupload.component.css']
})
export class ArticleuploadComponent implements OnInit {
    open = false;//控制多余查询框的展开收起
    startValue: Date = null;
    endValue: Date = null;
    startOpen: boolean = false;
    endOpen: boolean = false;

    findTittle = ''
    findStaus = ''
    wantStartTime = ''
    wantEndTime = ''
    pageNum = '1'
    total = ''
    WithdrawModal = false
    data = []

    showContent = false
    content

    showBack = false
    backChoosed //
    constructor(
        private route: ActivatedRoute,
        private message: NzMessageService,
        private dateTransform: TransformService,
        private api: ApiService,
    ) {
        if (this.route.snapshot.queryParams.pageNum) {
            this.pageNum = this.route.snapshot.queryParams.pageNum
        }
    }

    ngOnInit() {
        this.getData()
    }
    async getData() {
        let res = await this.api.getOriginalArticles({
            starttime: this.wantStartTime,
            endtime: this.wantEndTime,
            title: this.findTittle,
            status: this.findStaus,
            pageNum: this.pageNum,
            pageSize: 10
        });
        if (res.code == 200) {
            this.total = res.data.total
            this.data = res.data.list
        }
    }
    search() {
        this.pageNum = '1'
        this.getData()
    }
    reset() {
        this.findTittle = ''
        this.findStaus = ''
        this.startValue = null
        this.endValue = null
        this.wantStartTime = ''
        this.wantEndTime = ''
        this.pageNum = '1'
    }
    clickedWithdraw(data) {
        this.showBack = true
        this.backChoosed = data
    }
    async showBackOk() {
        let params = {
            articlesDetailId: this.backChoosed.id,
            status: 3
        }
        console.log(params)
        let res = await this.api.patchArticles(
            this.backChoosed.id, 3
        );
        if (res.code == '200') {
            this.getData()
            this.showBack = false;
            this.message.success('撤回成功')
        } else {
            this.message.error(res.reason)
        }
    }
    showBackCancel() {
        this.showBack = false
    }
    async clickedCancelPublish(data) {
        let res = await this.api.patchArticlesJob(data.id);
        if (res.code == '200') {
            this.getData()
            this.message.success('取消成功')
        } else {
            this.message.error(res.reason)
        }
        // this.http.patchCustomHeaders('kalanchoe-manager/v1/phosphor/backstage/articles/job/' + params.articlesDetailId, params).subscribe(e => {
        //     this.getData()
        // })
    }

    //查看文章
    clickedshowContent(content) {
        this.showContent = true
        this.content = content
    }

    showContentCancel() {
        this.showContent = false
    }
    showContentOk() {
        this.showContent = false
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
