import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//表单
import { RouterModule } from '@angular/router';//路由

/** 引入ng-zorro */
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';

// 引入自定义组件
import { AdminComponent } from './admin/admin.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
    declarations: [
        AdminComponent,
        BreadcrumbsComponent,
        HeaderComponent,
        MenuComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgZorroAntdModule.forRoot(),
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: zh_CN
        }
    ],
    exports: [
        AdminComponent,
        BreadcrumbsComponent,
        HeaderComponent,
        MenuComponent,
    ],
})
export class LayoutModule { }
