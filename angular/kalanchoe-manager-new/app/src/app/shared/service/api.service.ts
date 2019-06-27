import { Injectable } from '@angular/core';
import { HttpServe } from './http-serve.service'
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public resourceUrl = 'api/peak-resource/v1/resource/';//资源接口
    public managerUrl = 'api/kalanchoe-manager/v1/kalanchoe/backstage/';//获客接口
    public backManagerUrl = 'api/kalanchoe-manager/v1/app/back/';//获客接口
    public preManagerUrl = 'api/kalanchoe-manager/v2/app/pre/';//获客接口

    constructor(
        private http: HttpServe
    ) { }

    // header 修改密码
    public changePassword(account: any, params: any) {
        let url = this.resourceUrl + 'user/pass/' + account;
        return this.http.patch(url, params)
    }

    // home 首页统计
    public getUserInfo(userId) {
        let url = this.resourceUrl + 'user/' + userId
        return this.http.get(url)
    }
    public homeGetMaker() {
        let url = this.managerUrl + 'marker'
        return this.http.get(url)
    }
    public homeGetPartner() {
        let url = this.managerUrl + 'partner'
        return this.http.get(url)
    }
    public homeGetUser() {
        let url = this.managerUrl + 'user'
        return this.http.get(url)
    }
    public homeGetOrder() {
        let url = this.managerUrl + 'order'
        return this.http.get(url)
    }

    // maker 创客管理
    // makerperson 人员管理
    public getUserDataGrid(params: any) {
        let url = this.managerUrl + 'userDataGrid'
        return this.http.get(url, params)
    }
    public getGroup() {
        let url = this.managerUrl + 'group'
        return this.http.get(url)
    }
    public patchGroup(params: any) {
        let url = this.managerUrl + 'group'
        return this.http.patch(url, params)
    }
    public patchUser(params: any) {
        let url = this.managerUrl + 'user'
        return this.http.patch(url, params)
    }
    public patchUserGroup(params: any) {
        let url = this.managerUrl + 'user/group'
        return this.http.patch(url, params)
    }

    // detail 人员管理详情
    public getUserId(id) {
        let url = this.managerUrl + 'user/' + id
        return this.http.get(url)
    }
    public getUserLogDataGrid(id, params) {
        let url = this.managerUrl + 'user/' + id + '/logDataGrid'
        return this.http.get(url, params)
    }

    // makerperson 创客邀请记录
    public getInviterDataGrid(params) {
        let url = this.managerUrl + 'getInviterDataGrid'
        return this.http.get(url, params)
    }
    public getUserType(params) {
        let url = this.managerUrl + 'user/type'
        return this.http.get(url, params)
    }

    // makergroup分组管理
    public getGroupDataGrid(params) {
        let url = this.managerUrl + 'groupDataGrid'
        return this.http.get(url, params)
    }
    public postGroup(params: any) {
        let url = this.managerUrl + 'group'
        return this.http.post(url, params)
    }
    public putGroup(params: any) {
        let url = this.managerUrl + 'group'
        return this.http.put(url, params)
    }

    // partner 合伙人管理
    // partnerapply 申请管理
    public getPartnerDataGrid(params) {
        let url = this.managerUrl + 'partnerDataGrid'
        return this.http.get(url, params)
    }
    public patchPartner(params: any) {
        let url = this.managerUrl + 'partner'
        return this.http.patch(url, params)
    }

    // examine 审核
    public getPartner(id) {
        let url = this.managerUrl + 'partner/' + id
        return this.http.get(url)
    }

    // partnerperson 人员管理
    public getLevel() {
        let url = this.managerUrl + 'level'
        return this.http.get(url)
    }
    public getPartnerUserDataGrid(params) {
        let url = this.managerUrl + 'partner/userDataGrid'
        return this.http.get(url, params)
    }

    // partner 分销人脉
    public getDistributionPartnerDataGrid(params) {
        let url = this.managerUrl + 'distribution/partnerDataGrid'
        return this.http.get(url, params)
    }

    // customer 分销客户
    public getDistributionUserDataGrid(params) {
        let url = this.managerUrl + 'distribution/userDataGrid'
        return this.http.get(url, params)
    }
    // order 分销订单
    public getDistributionOrderDataGrid(params) {
        let url = this.managerUrl + 'distribution/orderDataGrid'
        return this.http.get(url, params)
    }
    public getProduct() {
        let url = this.managerUrl + 'product'
        return this.http.get(url)
    }

    // partnergrade 等级管理
    public deleteDelLevelById(id: any) {
        let url = this.managerUrl + 'delLevelById/' + id
        return this.http.delete(url)
    }
    public postLevel(params: any) {
        let url = this.managerUrl + 'level'
        return this.http.post(url, params)
    }

    // business 客户与订单
    // business-customer 客户管理
    public getUsersGrid(params) {
        let url = this.backManagerUrl + 'usersGrid'
        return this.http.get(url, params)
    }

    // customer-info 账户详情
    public getUsers(id) {
        let url = this.backManagerUrl + 'users/'+id
        return this.http.get(url)
    }

    // order 订单管理
    public patchShareProfit(params: any) {
        let url = this.preManagerUrl + 'shareProfit'
        return this.http.patch(url, params)
    }

    // public helpsPageGet(params: any) {
    //     let url = this.baseUrl + 'helpsDataGrid'
    //     return this.http.get(url, params, true)
    // }
    // public helpsSave(params: any) {
    //     let url = this.baseUrl + 'help'
    //     return this.http.post(url, params, true)
    // }
    // public helpsUpdate(id: any, params: any) {
    //     let url = this.baseUrl + 'helps/' + id
    //     return this.http.put(url, params, true)
    // }
    // public helpsDelete(id: any) {
    //     let url = this.baseUrl + 'helps/' + id
    //     return this.http.delete(url, {}, true)
    // }
    // public bannerStatus(id: any, params: any) {
    //     let url = this.baseUrl + 'banners/' + id
    //     return this.http.patch(url, params, true)
    // }
}
