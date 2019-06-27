import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/api.service';
import resource from "../../layout/resource/resource";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

    userInfo = resource.currentUser
    maker = {
        'todayNewUser': '',//今日新增创客数
        'currentUserCount': '',//当前创客总数
    };
    partner = {
        'currentPartnerCount': ''
    }
    user = {
        'todayNewUser': '',
        'currentUserCount': ''
    }
    order = {
        'currentOrderCount': ''
    }
    constructor(
        private api: ApiService
    ) { }

    async getUserInfo() {
        if (resource.currentUser) {
            let res = await this.api.getUserInfo(resource.currentUser.id)
            this.userInfo = res.data
        } else {
            setTimeout(() => {
                this.getUserInfo()
            }, 500);
        }
    }

    async getMaker() {
        let res = await this.api.homeGetMaker();
        if (res.code == 200) {
            this.maker = res.data;
        }
    }
    async getPartner() {
        let res = await this.api.homeGetPartner();
        if (res.code == 200) {
            this.partner = res.data;
        }
    }
    async getUser() {
        let res = await this.api.homeGetUser();
        if (res.code == 200) {
            this.user = res.data;
        }
    }
    async getOrder() {
        let res = await this.api.homeGetOrder();
        if (res.code == 200) {
            this.order = res.data;
        }
    }
    resolveRoleName(str) {
        if (str && str.length > 0) {
            return str.join(' | ')
        }
    }

    ngOnInit() {
        this.getUserInfo()
        this.getMaker();
        this.getPartner();
        this.getUser();
        this.getOrder();
    }
}
