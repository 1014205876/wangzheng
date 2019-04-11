import { Component, OnInit } from '@angular/core';
import { selfHttp } from '../../shared/service/http-service';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: [
        'home.page.scss',
    ],
})

export class HomePage implements OnInit {
    public insStaffNum: any//页面传参
    agreement = false;//控制金融服务协议的显示隐藏
    login = false;//控制login图标的显示隐藏
    constructor(
        private http: selfHttp,
        private activeRoute: ActivatedRoute
    ) {
        this.activeRoute.queryParams.subscribe((e) => {
            this.insStaffNum = e || {}
            console.log(this.insStaffNum)
        })
    }
    ngOnInit() {
    }
}
