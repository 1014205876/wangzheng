import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** 引入外部插件 */
/** 引入ng-zorro */
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

import { FileUploadModule } from 'ng2-file-upload';

import { LayoutModule } from './../layout/layout.module';
import { SharedModule } from './../shared/shared.module';
import { ComponentModule } from './../shared/component/component.module';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './business/customer/customer.component';
import { CustomerInfoComponent } from './business/customer/customer-info/customer-info.component';
import { OrderComponent } from './business/order/order.component';
import { OrderInfoComponent } from './business/order/order-info/order-info.component';
import { ProductManageComponent } from './business/product-manage/product-manage.component';
import { ApproveComponent } from './business/approve/approve.component';
import { SystemComponent } from './system/system.component';
import { HelpComponent } from './system/help/help.component';
import { BannerComponent } from './system/banner/banner.component';
import { OrderResultComponent } from './business/order/order-result/order-result.component';
import { ProductInfoComponent } from './business/product-manage/product-info/product-info.component';
import { PublishComponent } from './business/product-manage/publish/publish.component';
import { LookComponent } from './business/product-manage/look/look.component';
import { ApproveInfoComponent } from './business/approve/approve-info/approve-info.component';
import { LookAuthorizationComponent } from './look-authorization/look-authorization.component';

import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
 
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    HomeComponent,
    CustomerComponent,
    CustomerInfoComponent,
    OrderComponent,
    OrderInfoComponent,
    ProductManageComponent,
    ApproveComponent,
    SystemComponent,
    HelpComponent,
    BannerComponent,
    OrderResultComponent,
    ProductInfoComponent,
    PublishComponent,
    LookComponent,
    ApproveInfoComponent,
    LookAuthorizationComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    SwiperModule,
    LayoutModule,
    SharedModule,
    FileUploadModule,
    ComponentModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class PagesModule { }
