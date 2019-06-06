import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'

import { AdminComponent } from './admin/admin.component'
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component'
import { HeaderComponent } from './header/header.component'
import { MenuComponent } from './menu/menu.component'


/** 引入ng-zorro */
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SpanTagComponent } from './span-tag/span-tag.component';

/** 注册语言包 */
// import zh from '@angular/common/locales/zh';
// import { registerLocaleData } from '@angular/common';
// registerLocaleData(zh);

@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule.forRoot(),
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AdminComponent,
        BreadcrumbsComponent,
        HeaderComponent,
        MenuComponent,
        SpanTagComponent 
    ],
    exports: [
        AdminComponent,
        BreadcrumbsComponent,
        HeaderComponent,
        MenuComponent
    ]
})
export class LayoutModule { }
