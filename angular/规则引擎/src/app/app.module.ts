// 引入angular依赖
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// 引入angular插件
import { HttpInterceptorModule } from 'ng-http-interceptor';
import { NgZorroAntdModule } from 'ng-zorro-antd';

// 引入自定义ts文件
import { HttpModule } from '@angular/http';
import { HttpServe } from './layout/service/http-serve.service';

// 引入外部插件
// 引入页面;
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { MenuComponent } from './components/menu/menu.component';
import { ResourceDirective } from './components/directive/resource.directive';
import { IndexComponent } from './pages/index/index.component';
import { RulegroupComponent } from './pages/rule/rulegroup/rulegroup.component';
import { FielddataComponent } from './pages/rule/fielddata/fielddata.component';
import { RulemanagementComponent } from './pages/rule/rulemanagement/rulemanagement.component';
import { SeefieldComponent } from './pages/rule/fielddata/seefield/seefield.component';

const routes: Routes = [
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },
  { path: 'app/home', component: IndexComponent },
  { path: 'app/business/approve', component: RulegroupComponent },
  { path: 'see', component: RulegroupComponent },
  { path: 'app/business/authorize', component: RulemanagementComponent },
  { path: 'app/business/order', component: FielddataComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    MenuComponent,
    ResourceDirective,
    IndexComponent,
    NavComponent,
    RulegroupComponent,
    FielddataComponent,
    RulemanagementComponent,
    SeefieldComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    HttpInterceptorModule,
  ],
  providers: [
    HttpServe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
