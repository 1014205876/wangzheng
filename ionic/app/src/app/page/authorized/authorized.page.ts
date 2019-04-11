import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-authorized',
    templateUrl: './authorized.page.html',
    styleUrls: ['./authorized.page.scss'],
})
export class AuthorizedPage implements OnInit {

    public insStaffNum: any//页面传参
    testSwitch=true;//是否是则是测试环境
    testUrl='http://192.168.111.217:7530/pre-credit-result';//测试环境页面跳转
    formalUrl='http://192.168.111.134:4201/pre-credit-result';//正式环境页面跳转
    
    constructor(
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
