import { Component, OnInit } from '@angular/core';
import resource from '../../shared/app-load/resource';
import { HttpService } from '../../shared/service/http-serve.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    menu = [
        {
            name: "首页统计",
            state: "app/home",
            type: "link",
            url: "/app/home",
        },
        {
            children: [
                {
                    name: "人员管理",
                    state: "/app/maker/makerperson",
                    type: "link",
                    url: "/app/maker/makerperson",
                },
                {
                    name: "分组管理",
                    state: "/app/maker/makergroup",
                    type: "link",
                    url: "/app/maker/makergroup",
                }
            ],
            name: "创客管理",
            state: "/app/maker",
            type: "sub",
            url: "",
        },
        {
            children: [
                {
                    name: "申请管理",
                    state: "/app/partner/partnerapply",
                    type: "link",
                    url: "/app/partner/partnerapply",
                },
                {
                    name: "人员管理",
                    state: "/app/partner/partnerperson",
                    type: "link",
                    url: "/app/partner/partnerperson",
                },
                {
                    name: "等级管理",
                    state: "/app/partner/partnergrade",
                    type: "link",
                    url: "/app/partner/partnergrade",
                }
            ],
            name: "合伙人管理",
            state: "/app/partner",
            type: "sub",
            url: ""
        },
        {
            children: [
                {
                    name: "账户管理",
                    state: "/app/business/business-customer",
                    type: "link",
                    url: "/app/business/business-customer",
                },
                {
                    name: "企业管理",
                    state: "/app/business/approve",
                    type: "link",
                    url: "/app/business/approve",
                }
            ],
            name: "客户管理",
            state: "/app/business",
            type: "sub",
            url: "",
        },
        {
            children: [
                {
                    name: "订单管理",
                    state: "/app/business/order",
                    type: "link",
                    url: "/app/business/order",
                },
                {
                    name: "产品发布管理",
                    state: "/app/business/publishproduct",
                    type: "link",
                    url: "/app/business/publishproduct",
                }
            ],
            name: "产品与订单",
            state: "/app/prdord",
            type: "sub",
            url: "",
        },
        {
            children: [
                {
                    name: "banner管理",
                    state: "/app/system/banner",
                    type: "link",
                    url: "/app/system/banner",
                },
                {
                    name: "帮助管理",
                    state: "/app/system/help",
                    type: "link",
                    url: "/app/system/help",
                },
                {
                    name: "文章资源管理",
                    state: "/app/system/articleresource",
                    type: "link",
                    url: "/app/system/articleresource",
                },
                {
                    name: "文章发布管理",
                    state: "/app/system/articleupload",
                    type: "link",
                    url: "/app/system/articleupload",
                }
            ],
            name: "内容管理",
            state: "/app/system",
            type: "sub",
            url: "",
        },
        {
            children: [
                {
                    name: "资金管理",
                    state: "/app/financial/money",
                    type: "link",
                    url: "/app/financial/money",
                },
                {
                    name: "结算申请",
                    state: "/app/financial/settlement",
                    type: "link",
                    url: "/app/financial/settlement",
                },
                {
                    name: "提现记录",
                    state: "/app/financial/withdraw",
                    type: "link",
                    url: "/app/financial/withdraw",
                },
                {
                    name: "提现审核",
                    state: "/app/financial/audit",
                    type: "link",
                    url: "/app/financial/audit",
                },
                {
                    name: "资金划付",
                    state: "/app/financial/payment",
                    type: "link",
                    url: "/app/financial/payment",
                }
            ],
            name: "财务管理",
            state: "/app/financial",
            type: "sub",
            url: "",
        }
    ]
    nowIndex
    constructor(
        private http: HttpService,
    ) {
    }

    ngOnInit() {
        this.http.getCustomHeaders("peak-resource/api/resource/user/permission").subscribe(res => {
            resource.ResourceItems = res.data.resource;
            resource.menu = res.data.menu;
           // this.menu = res.data.menu;
        })
    }
    openHandler(index) {
        this.nowIndex = index
    }
}
