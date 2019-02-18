import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';//ngif，ngfor等
// import { BrowserModule } from '@angular/platform-browser';//ngif，ngfor等
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//动画
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//表单
import { HttpClientModule } from '@angular/common/http';//http
import { Routes, RouterModule } from '@angular/router';//路由

// 引入插件
import { NgZorroAntdModule, NZ_I18N, zh_CN, } from 'ng-zorro-antd';

// 引入组件页面
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';
import { SwitchComponent } from './switch/switch.component';

// 引入模块
import { ComponentModule } from '../component/component.module';

const routes: Routes = [
  // { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'pages',
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      { path: 'index', component: IndexComponent },
      { path: 'form', component: FormComponent },
      { path: 'switch', component: SwitchComponent },
      { path: 'model', loadChildren: './model/model.module#ModelModule' },
    ]
  }
];

@NgModule({
  declarations: [
    IndexComponent,
    FormComponent,
    SwitchComponent,
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
    ComponentModule,
    NgZorroAntdModule.forRoot(),
  ],
  exports: [
  ]
})
export class PagesModule { }
