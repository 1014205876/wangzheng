import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** 引入插件 */
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

// 引入组件
import { InputComponent } from './input/input.component';
import { RowComponent } from './row/row.component';
import { TableComponent } from './table/table.component';

@NgModule({
    declarations: [
        InputComponent,
        RowComponent,
        TableComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    providers: [
        {
            provide: NZ_I18N,
            useValue: zh_CN
        },
    ],
    exports: [
        InputComponent,
        RowComponent,
        TableComponent
    ]
})
export class FormComponentModule { }
