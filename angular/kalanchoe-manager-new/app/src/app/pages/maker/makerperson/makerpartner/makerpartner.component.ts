import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpServe } from '../../../../shared/service/http-serve.service';
import { TransformService } from '../../../../shared/service/transform.service';

@Component({
    selector: 'app-makerpartner',
    templateUrl: './makerpartner.component.html',
    styleUrls: ['./makerpartner.component.css']
})
export class MakerpartnerComponent implements OnInit {
    startValue: Date = null;
    endValue: Date = null;
    startOpen: boolean = false;
    endOpen: boolean = false;

    //查询变量
    findPhone = ''
    findRegisterSource = ''
    findGroupName = ''
    wantStartTime = ''
    wantEndTime = ''
    pageNum = 1

    //普通创客和合伙人数据
    normalMaker = 0
    countPartner = 0

    //分组信息
    options = []
    data = []
    total
    //路由传过来的参数
    userid
    inviterNum

    constructor(
        private route: ActivatedRoute,
        private http: HttpServe,
        private dateTransform: TransformService,
    ) { }

    ngOnInit() {
        this.userid = this.route.snapshot.queryParams.userid
        this.inviterNum = this.route.snapshot.queryParams.userTle
        this.getData() // 获取总数据
        this.getPartnerData()//获取普通创客和合伙人数据
        this.getGroupData()//获取分组信息
    }

    getData() {
        let id = this.userid
        // this.http.getCustomHeaders('kalanchoe-manager/v1/kalanchoe/backstage/inviterDataGrid?id=' + id +
        //     '&phone=' + this.findPhone +
        //     '&registerTimeStart=' + this.wantStartTime +
        //     '&registerTimeEnd=' + this.wantEndTime +
        //     '&registerSource=' + this.findRegisterSource +
        //     '&groupName=' + this.findGroupName +
        //     '&pageNum=' + this.pageNum +
        //     '&pageSize=' + 10)
        //     .subscribe(e => {
        //         this.data = []
        //         this.data = e.data.list
        //         this.total = e.data.total
        //     })
    }
    getPartnerData() {
        // this.http.getCustomHeaders(
        //     'kalanchoe-manager/v1/kalanchoe/backstage/user/type?id=' + this.userid

        // ).subscribe(res => {
        //     this.normalMaker = res.result.total
        //     this.countPartner = res.result.countPartner
        // })
    }

    getGroupData() {
        // this.http.getCustomHeaders('kalanchoe-manager/v1/kalanchoe/backstage/group').subscribe(e => {
        //     var list = e.data.map((item) => {
        //         return { 'groupId': item.id, 'groupName': item.groupName }
        //     })
        //     this.options = list
        // })
    }
    search() {
        this.getData()
    }
    reset() {
        this.findGroupName = ''
        this.findPhone = ''
        this.findRegisterSource = ''
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
