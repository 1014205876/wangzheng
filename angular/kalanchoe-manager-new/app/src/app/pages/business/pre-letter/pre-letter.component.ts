import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../../shared/service/http-serve.service';
import { DateTransformService } from './../../../shared/service/date-transform.service';

@Component({
    selector: 'app-pre-letter',
    templateUrl: './pre-letter.component.html',
    styleUrls: ['./pre-letter.component.css']
})
export class PreLetterComponent implements OnInit {
    total
    startValue: Date = null;
    endValue: Date = null;
    startOpen: boolean = false;
    endOpen: boolean = false;

    //查询变量
    findMobile = ''
    findNickname = ''
    findEtpName = ''
    findLegalName = ''
    wantStartTime = ''
    wantEndTime = ''
    pageNum = 1
    constructor(
        private http: HttpService,
        private dateTransform: DateTransformService
    ) {
    }

    ngOnInit() {
        this.getData()
    }
    search() {

    }
    reset() {

    }
    getData() {
        this.http.getCustomHeaders(
            'kalanchoe-manager/v1/app/back/pre/query?nickName='
            + this.findNickname
            + '&mobile=' + this.findMobile
            + '&etpName=' + this.findEtpName
            + '&legalName=' + this.findLegalName
            + '&createStartDate=' + this.wantStartTime
            + '&createEndDate=' + this.wantEndTime
            + '&pageNum=' + this.pageNum + '&pageSize=10'
        ).subscribe(res => {
            let data = res.result.list;
            this.total = res.result.total;
        })
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
