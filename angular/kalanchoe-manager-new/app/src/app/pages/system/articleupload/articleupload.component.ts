import { Component, OnInit } from '@angular/core';
import { DateTransformService } from '../../../shared/service/date-transform.service'
import { HttpService } from '../../../shared/service/http-serve.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-articleupload',
    templateUrl: './articleupload.component.html',
    styleUrls: ['./articleupload.component.css']
})
export class ArticleuploadComponent implements OnInit {
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
        private dateTransform: DateTransformService,
        private http: HttpService,
        private route: ActivatedRoute,

    ) { }

    ngOnInit() {
        if (this.route.snapshot.queryParams.pageNum) {
            this.pageNum = this.route.snapshot.queryParams.pageNum
        }
        this.getData()
    }
    getData() {
        // this.http.getCustomHeaders('kalanchoe-manager/v1/phosphor/backstage/articles?'
        //     + 'pageNum=' + this.pageNum
        //     + '&pageSize=10'
        //     + '&starttime=' + this.wantStartTime
        //     + '&endtime=' + this.wantEndTime
        //     + '&title=' + this.findTittle
        //     + '&status=' + this.findStaus).subscribe(e => {
        //         this.total = e.data.total
        //         this.data = e.data.list
        //     })
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
    showBackOk() {
        let params = {
            articlesDetailId: this.backChoosed.id,
            status: 3
        }
        // this.http.patchCustomHeaders('kalanchoe-manager/v1/phosphor/backstage/articles/' + params.articlesDetailId + "?status=" + params.status, params).subscribe(e => {
        //     this.getData()
        //     this.showBack = false
        // })
    }
    showBackCancel() {
        this.showBack = false
    }
    clickedCancelPublish(data) {
        let params = {
            articlesDetailId: data.id
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
