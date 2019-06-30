import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';

import { TransformService } from '../../../shared/service/transform.service';
import { ApiService } from '../../../shared/service/api.service';

@Component({
    selector: 'app-articleresource',
    templateUrl: './articleresource.component.html',
    styleUrls: ['./articleresource.component.css']
})
export class ArticleresourceComponent implements OnInit {
    startValue: Date = null;
    endValue: Date = null;
    startOpen: boolean = false;
    endOpen: boolean = false;

    //查找变量
    findTittle = ''
    wantStartTime = ''
    wantEndTime = ''
    pageNum = '1'
    total

    singleCheckModal = false
    publishCheckModal = false
    showContent = false
    data = []
    loading = true
    selected = []
    selectedLenth
    content
    manyCheckModal = false
    constructor(
        private router: Router,
        private message: NzMessageService,
        private dateTransform: TransformService,
        private api: ApiService,

    ) { }
    clickedshowContent(content) {
        this.showContent = true;
        this.content = content
    }
    showContentCancel() {
        this.showContent = false
    }
    showContentOk() {
        this.showContent = false
    }
    ngOnInit() {
        this.getData()
    }
    async getData() {
        let res = await this.api.getOriginalArticleDataGrid({
            starttime: this.wantStartTime,
            endtime: this.wantEndTime,
            title: this.findTittle,
            pageNum: this.pageNum,
            pageSize: 10
        });
        if (res.code == 200) {
            this.data = res.data.list
            this.total = res.data.total
        } else {
            this.message.error(res.reason)
        }
        this.loading = false
    }
    search() {
        this.pageNum = '1'
        this.getData()
    }
    reset() {
        this.findTittle = ''
        this.startValue = null
        this.endValue = null
        this.wantStartTime = ''
        this.wantEndTime = ''
        this.pageNum = '1'
    }
    //单个加入待发布
    clickedSinglePublish(id) {
        this.selected.push(id)
        this.singleCheckModal = true
    }
    singleCheckModalCancel() {
        this.singleCheckModal = false
        this.selected = []
    }
    singleCheckModalOk() {
        this.singleCheckModal = false
        this.manyCheckModalOk()
        this.publishCheckModal = true
    }
    //批量加入待发布
    checked($event, id) {
        if ($event === true) {
            this.selected.push(id)
        }
        if ($event === false) {
            let selected = this.selected.filter(item => {
                return item != id
            })
            this.selected = selected
        }
        this.selectedLenth = this.selected.length
    }
    clickedWillPublish() {
        this.manyCheckModal = true
    }
    async manyCheckModalOk() {
        let res = await this.api.patchOriginalArticle({
            list: this.selected
        });
        if (res.code == '200') {
            this.message.success('加入待发布列表成功，请至发布页面进行发布！')
            this.getData()
            this.manyCheckModal = false
            this.selected = []
        } else {
            this.message.error(res.reason)
        }


        // this.http.patchCustomHeaders('kalanchoe-manager/v1/phosphor/backstage/originalArticle',
        //     {
        //         list: this.selected
        //     }).subscribe(e => {
        //         if (e.code == '200') {
        //             this.message.success('批量加入待发布成功，请至发布页面进行发布！')
        //             this.getData()
        //             this.manyCheckModal = false
        //             this.selected = []
        //         }
        //         else {
        //             this.message.error(e.reason)
        //         }
        //     })
    }
    manyCheckModalCancel() {
        this.manyCheckModal = false
        this.selected = []
        this.selectedLenth = ''
    }
    publishCheckModalCancel() {
        this.publishCheckModal = false
    }
    publishCheckModalOk() {
        this.publishCheckModal = false
        this.router.navigateByUrl("app/system/articleupload")
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
