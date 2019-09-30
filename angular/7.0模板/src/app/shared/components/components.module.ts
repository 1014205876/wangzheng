import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//表单
import { RouterModule } from '@angular/router';//路由

/** 引入ng-zorro */
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
/** 注册语言包 */
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
registerLocaleData(zh);

// 引入组件
import { DynaactionFormModule } from './dynaaction-form/dynaaction-form.module';
import { FormComponentModule } from './form-component/form-component.module';
import { GvcodeComponent } from './gvcode/gvcode.component';
import { PageNavComponent } from './page-nav/page-nav.component';

@NgModule({
    declarations: [
        GvcodeComponent,
        PageNavComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgZorroAntdModule.forRoot(),
        DynaactionFormModule,
        FormComponentModule
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: zh_CN
        }
    ],
    exports: [
        GvcodeComponent,
        DynaactionFormModule,
        FormComponentModule,
        PageNavComponent
    ]
})
export class ComponentsModule { }
