import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';//ngif，ngfor
// import { BrowserModule } from '@angular/platform-browser';//ngif，ngfor等
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//动画
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//表单
import { HttpClientModule } from '@angular/common/http';//http
import { Routes, RouterModule } from '@angular/router';//路由

// 引入插件
import { NgZorroAntdModule, NZ_I18N, zh_CN, } from 'ng-zorro-antd';

// 引入组件页面
import { ModelComponent } from './model.component';

// 引入模块
import { IndexModule } from './index/index.module';
import { ComponentModule } from '../../component/component.module';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ModelComponent },
    ]
  }
];

@NgModule({
  declarations: [
    ModelComponent,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: zh_CN
    }
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule.forRoot(),
    IndexModule,
    ComponentModule
  ],
  exports: [
  ]
})
export class ModelModule { }
