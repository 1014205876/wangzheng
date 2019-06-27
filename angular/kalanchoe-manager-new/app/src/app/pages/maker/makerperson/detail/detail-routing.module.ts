import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

/** 引入外部插件 */
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

// 引入组件和服务
import { LayoutModule } from '../../../../layout/layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ComponentModule } from '../../../../shared/component/component.module';

// 引入页面
import { DetailComponent } from './detail.component';

const routes: Routes = [
    { path: '', component: DetailComponent }
];

@NgModule({
    declarations: [
        DetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        LayoutModule,
        SharedModule,
        ComponentModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        {
            provide: NZ_I18N, useValue: zh_CN
        },
    ],
    exports: [RouterModule]
})
export class DetailRoutingModule { }
