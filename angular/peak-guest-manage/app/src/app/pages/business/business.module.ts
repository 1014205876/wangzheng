import { ComponentModule } from './../../shared/component/component.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { LoanInputComponent } from './loan-input/loan-input.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

const routes: Routes = [
  {
    path: '', component: BusinessComponent, children: [
      { path: '', redirectTo: '' },
      {
        path: 'pre-letter', loadChildren: 'app/pages/business/pre-letter/pre-letter.module#PreLetterModule', data: {
          breadcrumb: ['业务管理', '信用额度评估管理']
        }
      },
      {
        path: 'letterinfo/:id', loadChildren: 'app/pages/business/letter-info/letter-info.module#LetterInfoModule', data: {
          breadcrumb: ['业务管理', '信用额度评估管理', '信用额度评估']
        }
      },
      {
        path: 'approve', loadChildren: 'app/pages/business/approve/approve.module#ApproveModule', data: {
          breadcrumb: ['业务管理', '企业客户管理']
        }
      },
      {
        path: 'approveinfo/:id', loadChildren: 'app/pages/business/approve-info/approve-info.module#ApproveInfoModule', data: {
          breadcrumb: ['业务管理', '企业客户管理', '绑定信息详情']
        }
      },
      {
        path: 'authorize', loadChildren: 'app/pages/business/authorize/authorize.module#AuthorizeModule', data: {
          breadcrumb: ['业务管理', '信息采集授权记录']
        }
      },
      {
        path: 'order', loadChildren: 'app/pages/business/order/order.module#OrderModule', data: {
          breadcrumb: ['业务管理', '贷款申请管理']
        }
      },
      {
        path: 'order-result', loadChildren: 'app/pages/business/order-result/order-result.module#OrderResultModule', data: {
          breadcrumb: ['业务管理', '贷款申请管理', '结果录入']
        }
      },
      {
        path: 'orderNo/:id', loadChildren: 'app/pages/business/order/order.module#OrderModule', data: {
          breadcrumb: ['业务管理', '贷款申请管理']
        }
      },
      {
        path: 'orderinfo/:id', loadChildren: 'app/pages/business/order-info/order-info.module#OrderInfoModule', data: {
          breadcrumb: ['业务管理', '贷款申请管理', '订单详情']
        }
      },
      {
        path: 'publishproduct', loadChildren: 'app/pages/business/publishproduct/publishproduct.module#PublishproductModule', data: {
          breadcrumb: ['业务管理', '产品发布管理']
        }
      },
      {
        path: 'publish/:id', loadChildren: 'app/pages/business/publish/publish.module#PublishModule', data: {
          breadcrumb: ['业务管理','产品管理', '发布产品']
        }
      },
      {
        path: 'look/:id/:state', loadChildren: 'app/pages/business/look/look.module#LookModule', data: {
          breadcrumb: ['业务管理','内容管理', '查看产品']
        }
      },
      {
        path: 'productinfor/:id', loadChildren: 'app/pages/business/productinfor/productinfor.module#ProductinforModule', data: {
          breadcrumb: ['业务管理','内容管理', '产品详细信息']
        }
      },
      {
        path: 'ordernosearch/:id',
        loadChildren: 'app/pages/business/order-no-search/order-no-search.module#OrderNoSearchModule'
      },
      {
        path: 'authorizeinfo',
        loadChildren: 'app/pages/business/authorize-info/authorize-info.module#AuthorizeInfoModule', data: {
          breadcrumb: ['业务管理', '企业授权管理', '企业授权审核']
        }
      },
      {
        path: 'loan-input', loadChildren: 'app/pages/business/loan-input/loan-input.module#LoanInputModule', data: {
          breadcrumb: ['业务管理','贷款结果录入']
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    RouterModule.forChild(routes),
    SwiperModule
  ],
  declarations: [BusinessComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class BusinessModule { }
