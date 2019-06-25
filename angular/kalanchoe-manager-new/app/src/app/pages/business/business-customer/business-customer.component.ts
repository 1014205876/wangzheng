import { Component, OnInit } from '@angular/core';
import { TransformService } from '../../../shared/service/transform.service';
import { HttpServe } from '../../../shared/service/http-serve.service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-business-customer',
    templateUrl: './business-customer.component.html',
    styleUrls: ['./business-customer.component.css']
})
export class BusinessCustomerComponent implements OnInit {
    startValue: Date = null;
    endValue: Date = null;
    startOpen: boolean = false;
    endOpen: boolean = false;

    //查询变量
    wantStartTime = ''
    wantEndTime = ''
    findPhone = ''
    findRegisterSource = ''
    findClientSource = ''
    findInsStaffPhone = ''
    findInsName = '' //拓展机构
    pageNum = 1

    total
    data = []

    constructor(
        private http: HttpServe,
        private dateTransform: TransformService,
        private route: ActivatedRoute,

    ) { }

    ngOnInit() {
        if (this.route.snapshot.queryParams.userTle) {
            this.findInsStaffPhone = this.route.snapshot.queryParams.userTle
        }
        else {
            this.findInsStaffPhone = ''
        }

        this.getData()
    }

    getData() {
        // this.http.getCustomHeaders(
        //     'kalanchoe-manager/v1/app/back/usersGrid'
        //     + '?mobile=' + this.findPhone
        //     + '&regStartDate=' + this.wantStartTime
        //     + '&regEndDate=' + this.wantEndTime
        //     + '&insName=' + this.findInsName
        //     + '&registSource=' + this.findRegisterSource
        //     + '&clientSource=' + this.findClientSource
        //     + '&insStaffName=' + this.findInsStaffPhone
        //     + '&pageNum=' + this.pageNum
        //     + '&pageSize=10'
        // ).subscribe(res => {
        //     let data = res.data.list;
        //     this.total = res.data.total;
        //     this.data = data;
        // })
    }
    search() {
        this.getData()
    }
    pageSearch($event) {
        this.pageNum = $event
        this.getData()
    }
    reset() {
        this.findPhone = ''
        this.findRegisterSource = ''
        this.findClientSource = ''
        this.findInsStaffPhone = ''
        this.startValue = null
        this.endValue = null
        this.wantStartTime = ''
        this.wantEndTime = ''
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
        }else{
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
