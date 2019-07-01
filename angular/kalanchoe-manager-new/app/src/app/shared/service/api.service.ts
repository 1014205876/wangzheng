import { Injectable } from '@angular/core';
import { HttpServe } from './http-serve.service'
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public resourceUrl = 'api/peak-resource/v1/resource/';//资源接口
    public managerUrl = 'api/kalanchoe-manager/v1/kalanchoe/backstage/';//获客接口
    public backManagerUrl = 'api/kalanchoe-manager/v1/app/back/';
    public v1ManagerUrl = 'api/kalanchoe-manager/v1/';

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
        let url = this.backManagerUrl + 'users/' + id
        return this.http.get(url)
    }

    // order 订单管理
    public patchShareProfit(params: any) {
        let url = 'api/kalanchoe-manager/v2/app/pre/' + 'shareProfit'
        return this.http.patch(url, params)
    }
    public postImportLoans(params: any) {
        let url = 'api/kalanchoe-manager/v2/app/pre/' + 'importLoans'
        return this.http.post(url, params)
    }
    public getLoansGrid(params) {
        let url = 'api/kalanchoe-manager/v2/app/pre/' + 'loansGrid'
        return this.http.get(url, params)
    }

    // system 内容管理
    // banner banner管理
    public getBanner(params) {
        let url = this.backManagerUrl + 'banner'
        return this.http.get(url, params)
    }
    public postBanner(params: any) {
        let url = this.backManagerUrl + 'banner'
        return this.http.post(url, params)
    }
    public deleteBanners(id: any) {
        let url = this.backManagerUrl + 'banners/' + id
        return this.http.delete(url)
    }
    public putBanners(id: any, params) {
        let url = this.backManagerUrl + 'banners/' + id
        return this.http.put(url, params)
    }
    public getBannersDataGrid(params) {
        let url = this.backManagerUrl + 'bannersDataGrid'
        return this.http.get(url, params)
    }
    public getBannerSort(params) {
        let url = this.backManagerUrl + 'banner/sort'
        return this.http.get(url, params)
    }
    public patchBanners(id: any, params: any) {
        let url = this.backManagerUrl + 'banners/' + id
        return this.http.patch(url, params)
    }
    public getFindGroup(params) {
        let url = this.backManagerUrl + 'find/group'
        return this.http.get(url, params)
    }

    // articleresource 文章资源管理
    public getOriginalArticleDataGrid(params) {
        let url = this.v1ManagerUrl + 'phosphor/backstage/originalArticleDataGrid'
        return this.http.get(url, params)
    }
    public patchOriginalArticle(params: any) {
        let url = this.v1ManagerUrl + 'phosphor/backstage/originalArticle'
        return this.http.patch(url, params)
    }

    // articleupload 文章发布管理
    public getOriginalArticles(params) {
        let url = this.v1ManagerUrl + 'phosphor/backstage/articles'
        return this.http.get(url, params)
    }
    public patchArticles(id, status) {
        let url = this.v1ManagerUrl + 'phosphor/backstage/articles/' + id + '?status=' + status
        return this.http.patch(url)
    }
    public patchArticlesJob(id) {
        let url = this.v1ManagerUrl + 'phosphor/backstage/articles/job/' + id
        return this.http.patch(url)
    }

    // articlepublish 文章发布
    public getArticles(id) {
        let url = this.v1ManagerUrl + 'phosphor/backstage/articles/' + id
        return this.http.get(url)
    }
    public putArticles(params) {
        let url = this.v1ManagerUrl + 'phosphor/backstage/articles'
        return this.http.put(url, params)
    }

    // financial 财务管理
    // money 资金管理
    public getDataGrid(params) {
        let url = this.v1ManagerUrl + 'account/user/dataGrid'
        return this.http.get(url, params)
    }
    public getDeployShow(params) {
        let url = this.v1ManagerUrl + 'account/deploy/show'
        return this.http.get(url, params)
    }
    public postDeploy(params: any) {
        let url = this.v1ManagerUrl + 'account/deploy'
        return this.http.post(url, params)
    }

    // bankcard 银行卡
    public getUserCards(params) {
        let url = this.v1ManagerUrl + 'bank/user/cards'
        return this.http.get(url, params)
    }

    // bonussubsidiary 奖金明细
    public getBankDataGrid(params) {
        let url = this.v1ManagerUrl + 'reward/user/back/dataGrid'
        return this.http.get(url, params)
    }

    // capitalsubsidiary 余额明细
    public getBalanceBankDataGrid(params) {
        let url = this.v1ManagerUrl + 'balance/user/back/dataGrid'
        return this.http.get(url, params)
    }

    // commissionsubsidiary 佣金明细
    public getRewardBankDataGrid(params) {
        let url = this.v1ManagerUrl + 'reward/user/back/dataGrid'
        return this.http.get(url, params)
    }

    // goldsubsidiary 金币明细
    public getGlodBankDataGrid(params) {
        let url = this.v1ManagerUrl + 'glod/user/back/dataGrid'
        return this.http.get(url, params)
    }

    // settlementApply 结算申请
    public getSettlementApply(params) {
        let url = this.v1ManagerUrl + 'settlementApply'
        return this.http.get(url, params)
    }
    public putSettlementApply(params) {
        let url = this.v1ManagerUrl + 'settlementApply/updateStatus'
        return this.http.put(url, params)
    }

    // withdraw 提现记录
    public getBackAppCashs(params) {
        let url = this.v1ManagerUrl + 'back/app/cashs' + params
        return this.http.get(url)
    }

    // audit 提现审核
    public patchCashApply(status, params) {
        let url = this.v1ManagerUrl + 'back/app/cashApply/' + status
        return this.http.patch(url,params)
    }

    // payment 资金划付
    public postPayInput(params) {
        let url = this.v1ManagerUrl + 'back/app/cash/pay/input'
        return this.http.post(url,params)
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
