
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

// 引入外部插件
import { HttpInterceptorModule } from 'ng-http-interceptor';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FileUploadModule } from 'ng2-file-upload';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

// 引入自定义组件
import { CrumbComponent } from '../../shared/crumb/crumb.component';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { PicScaleComponent } from '../../shared/pic-scale/pic-scale.component';
import { TagComponent } from '../../shared/tag/tag.component';
import { TinyEditorComponent } from '../../shared/tiny-editor/tiny-editor.component';

// 引入自定义服务
import { AuthService } from '../../shared/service/auth.service';
import { DateTransformService } from '../../shared/service/date-transform.service';
import { HttpService } from '../../shared/service/http-serve.service';

// 引入页面
import { MainComponent } from './main.component';
import { HomeComponent } from '../home/home.component';
import { MakerpersonComponent } from '../maker/makerperson/makerperson.component';
import { MakergroupComponent } from '../maker/makergroup/makergroup.component';
import { DetailComponent } from '../maker/makerperson/detail/detail.component';
import { MakerpartnerComponent } from '../maker/makerperson/makerpartner/makerpartner.component';

// 创客管理
import { PartnerdetailComponent } from '../partner/partnerapply/partnerdetail/partnerdetail.component';
import { ExamineComponent } from '../partner/partnerapply/examine/examine.component';
import { PartnerapplyComponent } from '../partner/partnerapply/partnerapply.component';
import { PartnergradeComponent } from '../partner/partnergrade/partnergrade.component';
import { PartnerpersonComponent } from '../partner/partnerperson/partnerperson.component';

// 合伙人管理
import { PartnerComponent } from '../partner/partnerperson/partner/partner.component';
import { CustomerComponent } from '../partner/partnerperson/customer/customer.component';
import { OrderComponent } from '../partner/partnerperson/order/order.component';

// 客户管理
import { PreLetterComponent } from '../business/pre-letter/pre-letter.component';
import { BusinessCustomerComponent } from '../business/business-customer/business-customer.component';
import { CustomerInfoComponent } from '../business/business-customer/customer-info/customer-info.component';
import { ApproveComponent } from '../business/approve/approve.component';
import { ApproveInfoComponent } from '../business/approve-info/approve-info.component';

// 产品与订单
import { businessorderComponent } from '../business/order/order.component';
import { OrderInfoComponent } from '../business/order-info/order-info.component';
import { OrderResultComponent } from '../business/order-result/order-result.component';
import { PublishproductComponent } from '../business/publishproduct/publishproduct.component';
import { PublishComponent } from '../business/publish/publish.component';//发布/编辑产品页面
import { LookComponent } from '../business/look/look.component';//查看/审批产品页面
import { ProductinforComponent } from '../business/productinfor/productinfor.component';//查看产品详细信息页面

// 内容管理
import { BannerComponent } from '../system/banner/banner.component';
import { HelpComponent } from '../system/help/help.component';
import { ArticleresourceComponent } from '../system/articleresource/articleresource.component';
import { ArticleuploadComponent } from '../system/articleupload/articleupload.component';
import { ArticlepublishComponent } from '../system/articleupload/articlepublish/articlepublish.component';

// 财务管理
import { MoneyComponent } from '../financial/money/money.component';
import { CapitalsubsidiaryComponent } from '../financial/money/capitalsubsidiary/capitalsubsidiary.component';
import { CommissionsubsidiaryComponent } from '../financial/money/commissionsubsidiary/commissionsubsidiary.component';
import { BonussubsidiaryComponent } from '../financial/money/bonussubsidiary/bonussubsidiary.component';
import { GoldsubsidiaryComponent } from '../financial/money/goldsubsidiary/goldsubsidiary.component';
import { BankcardComponent } from '../financial/money/bankcard/bankcard.component';
import { SettlementComponent } from '../financial/settlement/settlement.component';
import { WithdrawComponent } from '../financial/withdraw//withdraw.component';
import { AuditComponent } from '../financial/audit/audit.component';
import { PaymentComponent } from '../financial/payment/payment.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {

};
//data中数据已在对应页面传入，此处无意义，仅用来分辨对应页面
const routes: Routes = [
    {
        path: '', component: MainComponent,
        children: [
            { path: '', redirectTo: 'app/home', pathMatch: "full" },
            {
                path: 'app/home', component: HomeComponent, data: {
                    breadcrumb: ["首页统计"]
                }
            },
            {
                path: 'app/maker/makerperson', component: MakerpersonComponent, data: {
                    breadcrumb: ["创客管理", "人员管理"]
                }
            },
            {
                path: 'app/maker/makerperson/detail', component: DetailComponent, data: {
                    breadcrumb: ["创客管理", "人员管理", "详情"]
                }
            },
            {
                path: 'app/maker/makerperson/partner', component: MakerpartnerComponent, data: {
                    breadcrumb: ["创客管理", "人员管理", "创客伙伴"]
                }
            },
            {
                path: 'app/maker/makergroup', component: MakergroupComponent, data: {
                    breadcrumb: ["创客管理", "分组管理"]
                }
            },
            {
                path: 'app/partner/partnerapply', component: PartnerapplyComponent, data: {
                    breadcrumb: ["合伙人管理", "申请管理"]
                }
            },
            {
                path: 'app/partner/partnerapply/detail', component: PartnerdetailComponent, data: {
                    breadcrumb: ["合伙人管理", "申请管理", "详情"]
                }
            },
            {
                path: 'app/partner/partnerapply/examine', component: ExamineComponent, data: {
                    breadcrumb: ["合伙人管理", "申请管理", "审核"]
                }
            },
            {
                path: 'app/partner/partnerperson', component: PartnerpersonComponent, data: {
                    breadcrumb: ["合伙人管理", "人员管理"]
                }
            },
            {
                path: 'app/partner/partnerperson/partner', component: PartnerComponent, data: {
                    breadcrumb: ["合伙人管理", "人员管理", "分销伙伴"]
                }
            },
            {
                path: 'app/partner/partnerperson/customer', component: CustomerComponent, data: {
                    breadcrumb: ["合伙人管理", "人员管理", "分销客户"]
                }
            },
            {
                path: 'app/partner/partnerperson/order', component: OrderComponent, data: {
                    breadcrumb: ["合伙人管理", "人员管理", "分销订单"]
                }
            },
            {
                path: 'app/partner/partnergrade', component: PartnergradeComponent, data: {
                    breadcrumb: ["合伙人管理", "等级管理"]
                }
            },
            {
                path: 'app/business/pre-letter', component: PreLetterComponent, data: {
                    breadcrumb: ["客户管理", "信用额度评估"]
                }
            },
            {
                path: 'app/business/business-customer', component: BusinessCustomerComponent, data: {
                    breadcrumb: ["客户管理", "账户管理"]
                }
            },
            {
                path: 'app/business/customer-info', component: CustomerInfoComponent, data: {
                    breadcrumb: ["客户管理", "账户管理", "用户详情"]
                }
            },
            {
                path: 'app/business/approve', component: ApproveComponent, data: {
                    breadcrumb: ["客户管理", "企业管理"]
                }
            },
            {
                path: 'app/business/approveinfo', component: ApproveInfoComponent, data: {
                    breadcrumb: ["客户管理", "企业管理", "绑定详情"]
                }
            },
            {
                path: 'app/business/order', component: businessorderComponent, data: {
                    breadcrumb: ["产品与订单", "订单管理"]
                }
            },
            {
                path: 'app/business/orderinfo', component: OrderInfoComponent, data: {
                    breadcrumb: ["产品与订单", "订单管理", "订单详情"]
                }
            },
            {
                path: 'app/business/order-result', component: OrderResultComponent, data: {
                    breadcrumb: ["产品与订单", "订单管理", "结果录入"]
                }
            },
            {
                path: 'app/business/publishproduct', component: PublishproductComponent, data: {
                    breadcrumb: ["产品与订单", "产品发布管理"]
                }
            },
            {
                path: 'app/business/publish/:id', component: PublishComponent, data: {
                    breadcrumb: ["产品与订单", "产品发布管理", "发布产品"]
                }
            },
            {
                path: 'app/business/look/:id/:state', component: LookComponent, data: {
                    breadcrumb: ["产品与订单", "产品发布管理", "查看产品"]
                }
            },
            {
                path: 'app/business/productinfor/:id', component: ProductinforComponent, data: {
                    breadcrumb: ["产品与订单", "产品发布管理", "产品详细信息"]
                }
            },
            {
                path: 'app/system/banner', component: BannerComponent, data: {
                    breadcrumb: ["内容管理", "banner管理"]
                }
            },
            {
                path: 'app/system/help', component: HelpComponent, data: {
                    breadcrumb: ["内容管理", "帮助管理"]
                }
            },
            {
                path: 'app/system/articleresource', component: ArticleresourceComponent, data: {
                    breadcrumb: ["内容管理", "文章资源管理"]
                }
            },
            {
                path: 'app/system/articleupload', component: ArticleuploadComponent, data: {
                    breadcrumb: ["内容管理", "文章发布管理"]
                }
            },
            {
                path: 'app/system/articleupload/articlepublish', component: ArticlepublishComponent, data: {
                    breadcrumb: ["内容管理", "文章发布管理", "文章发布"]
                }
            },
            {
                path: 'app/financial/money', component: MoneyComponent, data: {
                    breadcrumb: ["财务管理", "资金管理"]
                }
            },
            {
                path: 'app/financial/money/capitalsubsidiary', component: CapitalsubsidiaryComponent, data: {
                    breadcrumb: ["财务管理", "资金管理", "余额明细"]
                }
            },
            {
                path: 'app/financial/money/commissionsubsidiary', component: CommissionsubsidiaryComponent, data: {
                    breadcrumb: ["财务管理", "资金管理", "佣金明细"]
                }
            },
            {
                path: 'app/financial/money/bonussubsidiary', component: BonussubsidiaryComponent, data: {
                    breadcrumb: ["财务管理", "资金管理", "奖金明细"]
                }
            },
            {
                path: 'app/financial/money/goldsubsidiary', component: GoldsubsidiaryComponent, data: {
                    breadcrumb: ["财务管理", "资金管理", "金币明细"]
                }
            },
            {
                path: 'app/financial/money/bankcard', component: BankcardComponent, data: {
                    breadcrumb: ["财务管理", "资金管理", "银行卡"]
                }
            },
            {
                path: 'app/financial/settlement', component: SettlementComponent, data: {
                    breadcrumb: ["财务管理", "结算申请"]
                }
            },
            {
                path: 'app/financial/withdraw', component: WithdrawComponent, data: {
                    breadcrumb: ["财务管理", "提现记录"]
                }
            },
            {
                path: 'app/financial/audit', component: AuditComponent, data: {
                    breadcrumb: ["财务管理", "提现审核"]
                }
            },
            {
                path: 'app/financial/payment', component: PaymentComponent, data: {
                    breadcrumb: ["财务管理", "资金划付"]
                }
            },
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        HttpInterceptorModule,
        NgZorroAntdModule.forRoot(),
        SwiperModule,
        FileUploadModule,
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: zh_CN
        },
        AuthService,
        DateTransformService,
        HttpService,
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        }
    ],
    declarations: [
        CrumbComponent,
        HeaderComponent,
        PicScaleComponent,
        TagComponent,
        TinyEditorComponent,
        MainComponent,
        HomeComponent,
        MakerpersonComponent,
        MakergroupComponent,
        DetailComponent,
        MakerpartnerComponent,
        PartnerapplyComponent,
        PartnergradeComponent,
        PartnerpersonComponent,
        PartnerdetailComponent,
        ExamineComponent,
        PartnerComponent,
        CustomerComponent,
        OrderComponent,
        HelpComponent,
        BannerComponent,
        businessorderComponent,
        PublishproductComponent,
        OrderInfoComponent,
        OrderResultComponent,
        ApproveComponent,
        BusinessCustomerComponent,
        PreLetterComponent,
        CustomerInfoComponent,
        PublishComponent,
        ApproveInfoComponent,
        LookComponent,
        ProductinforComponent,
        MoneyComponent,
        SettlementComponent,
        WithdrawComponent,
        PaymentComponent,
        AuditComponent,
        CapitalsubsidiaryComponent,
        CommissionsubsidiaryComponent,
        BonussubsidiaryComponent,
        GoldsubsidiaryComponent,
        BankcardComponent,
        ArticleresourceComponent,
        ArticleuploadComponent,
        ArticlepublishComponent,
    ]
})
export class MainModule { }
