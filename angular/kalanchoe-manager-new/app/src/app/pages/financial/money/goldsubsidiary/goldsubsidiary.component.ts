import { Component, OnInit } from '@angular/core';
import { TransformService } from '../../../../shared/service/transform.service';
import { HttpServe } from '../../../../shared/service/http-serve.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-goldsubsidiary',
    templateUrl: './goldsubsidiary.component.html',
    styleUrls: ['./goldsubsidiary.component.css']
})
export class GoldsubsidiaryComponent implements OnInit {

    startValue: Date = null;
    endValue: Date = null;
    startOpen: boolean = false;
    endOpen: boolean = false;
    //查找变量
    findUse = ''
    findFlow = ''
    wantStartTime = ''
    wantEndTime = ''
    pageNum = '1'
    total = '30'

    mobile = ''
    data = []
    constructor(
        private dateTransform: TransformService,
        private http: HttpServe,
        private route: ActivatedRoute,

    ) { }

    ngOnInit() {
        this.mobile = this.route.snapshot.queryParams.mobile
        this.getData()
    }
    getData() {
        // this.http.getCustomHeaders('kalanchoe-manager/v1/glod/user/back/dataGrid?'
        //     + 'pageNum=' + this.pageNum
        //     + '&pageSize=10'
        //     + '&mobile=' + this.mobile
        //     + '&createStartDate=' + this.wantStartTime
        //     + '&createEndDate=' + this.wantEndTime
        //     + '&type=' + this.findUse
        //     + '&income=' + this.findFlow).subscribe(e => {
        //         this.total = e.data.list.total
        //         this.data = e.data.list.list
        //     })
    }
    search() {
        this.getData()
        this.pageNum = '1'
    }
    reset() {
        this.findUse = ''
        this.findFlow = ''
        this.startValue = null
        this.endValue = null
        this.wantStartTime = ''
        this.wantEndTime = ''
        this.pageNum = '1'
    }
    pageSearch($event) {
        this.pageNum = $event
        this.getData()
    }

    //时间选择ang-zorro默认
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
