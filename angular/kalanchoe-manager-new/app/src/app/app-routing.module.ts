import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 引入插件
import { registerLocaleData } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { FileUploadModule } from 'ng2-file-upload';

// 引入组件和服务
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

// 引入页面
import { AdminComponent } from './layout/admin/admin.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'app/home', pathMatch: 'full' },
            { path: 'app', redirectTo: 'app/home', pathMatch: 'full' },
            { path: 'app/home', loadChildren: './pages/home/home.module#HomeModule' },
            {
                path: 'app/maker',
                children: [
                    {
                        path: 'makerperson', children: [
                            { path: '', loadChildren: './pages/maker/makerperson/makerperson.module#MakerpersonModule' },
                            { path: 'detail', loadChildren: './pages/maker/makerperson/detail/detail.module#DetailModule' },
                            { path: 'partner', loadChildren: './pages/maker/makerperson/makerpartner/makerpartner.module#MakerpartnerModule' },
                            { path: 'makerpartner', loadChildren: './pages/maker/makerperson/makerpartner/makerpartner.module#MakerpartnerModule' },
                        ]
                    },
                    {
                        path: 'makergroup', children: [
                            { path: '', loadChildren: './pages/maker/makergroup/makergroup.module#MakergroupModule' },
                        ]
                    },
                ]
            }, 
            {
                path: 'app/partner',
                children: [
                    {
                        path: 'partnerapply', children: [
                            { path: '', loadChildren: './pages/partner/partnerapply/partnerapply.module#PartnerapplyModule' },
                            { path: 'detail', loadChildren: './pages/partner/partnerapply/partnerdetail/partnerdetail.module#PartnerdetailModule' },
                            { path: 'examine', loadChildren: './pages/partner/partnerapply/examine/examine.module#ExamineModule' },
                        ]
                    },
                    {
                        path: 'partnerperson', children: [
                            { path: '', loadChildren: './pages/partner/partnerperson/partnerperson.module#PartnerpersonModule' },
                            { path: 'customer', loadChildren: './pages/partner/partnerperson/customer/customer.module#CustomerModule' },
                            { path: 'order', loadChildren: './pages/partner/partnerperson/order/order.module#OrderModule' },
                            { path: 'partner', loadChildren: './pages/partner/partnerperson/partner/partner.module#PartnerModule' },
                        ]
                    },
                    {
                        path: 'partnergrade', children: [
                            { path: '', loadChildren: './pages/partner/partnergrade/partnergrade.module#PartnergradeModule' },
                        ]
                    },
                ]
            },
            {
                path: 'app/business',
                children: [
                    {
                        path: 'business-customer', children: [
                            { path: '', loadChildren: './pages/business/business-customer/business-customer.module#BusinessCustomerModule' },
                            { path: 'customer-info', loadChildren: './pages/business/business-customer/customer-info/customer-info.module#CustomerInfoModule' },
                        ]
                    },
                    {
                        path: 'order', children: [
                            { path: '', loadChildren: './pages/business/order/order.module#OrderModule' },
                        ]
                    },
                ]
            },
        ]
    }
];

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        NgZorroAntdModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LayoutModule,
        SharedModule,
        FileUploadModule,
        RouterModule.forRoot(
            routes,
            { preloadingStrategy: PreloadAllModules }
        )
    ],
    providers: [{ provide: NZ_I18N, useValue: zh_CN }],
    exports: [RouterModule]
})
export class AppRoutingModule { }