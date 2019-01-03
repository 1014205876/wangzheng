// 引入angular依赖
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

/** 注册语言包 */
import zh from '@angular/common/locales/zh';
import { registerLocaleData } from '@angular/common';
registerLocaleData(zh);

// 引入外部插件
// 引入ng-zorro
import { NgZorroAntdModule } from 'ng-zorro-antd';
// 引入自定义组件
import { NavComponent } from './component/nav/nav.component';
import { HeaderComponent } from './component/header/header.component';
import { AdminComponent } from './component/admin/admin.component';
import { ResourceDirective } from './component/directive/resource.directive';
// 引入自定义ts文件
import { HttpModule } from '@angular/http';
import { HttpInterceptorModule } from 'ng-http-interceptor';
import { HttpServe } from './layout/service/http-serve.service';
// 引入路由;
import { RouterModule, Routes } from '@angular/router';
// 引入页面;
import { TableComponent } from './pages/table/table.component';
import { EchartComponent } from './pages/echart/echart.component';
import { IndexComponent } from './pages/index/index.component';
import { ApplicationComponent } from './pages/application/application.component';
import { MenuComponent } from './component/menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'application', component: ApplicationComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    TableComponent,
    EchartComponent,
    ApplicationComponent,
    MenuComponent,
    NavComponent,
    HeaderComponent,
    AdminComponent,
    ResourceDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpInterceptorModule,
    NgZorroAntdModule.forRoot()
  ],
  providers: [
    HttpServe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
