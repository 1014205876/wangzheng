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
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'app/home', pathMatch: 'full' },
            { path: 'app', redirectTo: 'app/home', pathMatch: 'full' },
            {
                path: 'app/home', component: HomeComponent, data: {
                    breadcrumb: ["首页统计"]
                }
            }
        ]
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
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
    exports: [RouterModule]
})
export class AppRoutingModule { }