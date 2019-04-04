import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//表单
import { RouterModule } from '@angular/router';//路由

/** 引入ng-zorro */
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
/** 注册语言包 */
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
import { FormComponentComponent } from './form-component/form-component.component';
import { FormInputComponent } from './form-input/form-input.component';
registerLocaleData(zh);

// 引入组件

@NgModule({
    declarations: [
        FormComponentComponent,
        FormInputComponent
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
        FormComponentComponent,
        FormInputComponent
    ]
})
export class ComponentsModule { }
