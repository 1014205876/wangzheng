import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './layout/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomerComponent } from './pages/business/customer/customer.component';
import { CustomerInfoComponent } from './pages/business/customer/customer-info/customer-info.component';
import { OrderComponent } from './pages/business/order/order.component';
import { OrderInfoComponent } from './pages/business/order/order-info/order-info.component';
import { ProductManageComponent } from './pages/business/product-manage/product-manage.component';
import { ApproveComponent } from './pages/business/approve/approve.component';
import { SystemComponent } from './pages/system/system.component';
import { HelpComponent } from './pages/system/help/help.component';
import { BannerComponent } from './pages/system/banner/banner.component';
import { OrderResultComponent } from './pages/business/order/order-result/order-result.component';
import { ProductInfoComponent } from './pages/business/product-manage/product-info/product-info.component';
import { PublishComponent } from './pages/business/product-manage/publish/publish.component';
import { LookComponent } from './pages/business/product-manage/look/look.component';
import { ApproveInfoComponent } from './pages/business/approve/approve-info/approve-info.component';

import { LookAuthorizationComponent } from './pages/look-authorization/look-authorization.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app/home' },
  {
    path: 'app', component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'business/customer', component: CustomerComponent },
      { path: 'business/customer/info', component: CustomerInfoComponent },
      { path: 'business/order', component: OrderComponent },
      { path: 'business/order/info', component: OrderInfoComponent },
      { path: 'business/order/result', component: OrderResultComponent },
      { path: 'business/product', component: ProductManageComponent },
      { path: 'business/product/info', component: ProductInfoComponent },
      { path: 'business/product/publish', component: PublishComponent },
      { path: 'business/product/look', component: LookComponent },
      { path: 'business/approve', component: ApproveComponent },
      { path: 'business/approve/info', component: ApproveInfoComponent },
      { path: 'system', component: SystemComponent },
      { path: 'system/help', component: HelpComponent },
      { path: 'system/banner', component: BannerComponent }
    ]
  },
  {
    path: 'app/pic/swiper',
    component: LookAuthorizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
