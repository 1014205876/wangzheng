import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';//ngif，ngfor等
import { BrowserModule } from '@angular/platform-browser';//ngif，ngfor等
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//动画
import { Routes, RouterModule } from '@angular/router';//路由
import { HttpInterceptorModule } from 'ng-http-interceptor';//请求拦截

// 引入插件
import { NgZorroAntdModule, NZ_I18N, zh_CN, } from 'ng-zorro-antd';//ng-zerro

// 引入组件 ng generate component name
import { AppComponent } from './app.component';

// 引入模块
import { ComponentModule } from './component/component.module';

const routes: Routes = [
  { path: '', redirectTo: '/pages', pathMatch: 'full' },//默认路由
  { path: '', loadChildren: './pages/pages.module#PagesModule' },//懒加载
  { path: 'pages/indexs', component: AppComponent },
];

@NgModule({
  declarations: [//声明需要使用的模块
    AppComponent,
  ],
  providers: [//自己写的服务类
    {
      provide: NZ_I18N,
      useValue: zh_CN
    }
  ],
  imports: [//导入其他module
    // CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpInterceptorModule,
    NgZorroAntdModule.forRoot(),
    ComponentModule,
  ],
  bootstrap: [AppComponent],//指定应用的主视图，只有根模块才可使用
})
export class AppModule { }