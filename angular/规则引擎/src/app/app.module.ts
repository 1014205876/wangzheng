import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HttpInterceptorModule } from 'ng-http-interceptor';
import { NgZorroAntdModule,NZ_I18N, zh_CN  } from 'ng-zorro-antd';
import { FileUploadModule } from 'ng2-file-upload';

import { HttpModule } from '@angular/http';
import { HttpServe } from './layout/service/http-serve.service';

import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { PageNavComponent } from './components/page-nav/page-nav.component';
import { MenuComponent } from './components/menu/menu.component';
import { ResourceDirective } from './components/directive/resource.directive';
import { IndexComponent } from './pages/index/index.component';//首页
import { FielddataComponent } from './pages/rule/fielddata/fielddata.component';//模型规则-数据模型
import { SeefieldComponent } from './pages/rule/fielddata/seefield/seefield.component';//模型规则-数据模型-查看字段
import { RulegroupComponent } from './pages/rule/rulegroup/rulegroup.component';//模型规则-规则分组
import { RulemanagementComponent } from './pages/rule/rulemanagement/rulemanagement.component';//模型规则-数据模型
import { AddruleComponent } from './pages/rule/rulemanagement/addrule/addrule.component';//模型规则-规则管理-创建规则
import { ChangeruleComponent } from './pages/rule/rulemanagement/changerule/changerule.component';//模型规则-规则管理-修改信息
import { SeeruleComponent } from './pages/rule/rulemanagement/seerule/seerule.component';//模型规则-规则管理-查看规则
import { UpdateruleComponent } from './pages/rule/rulemanagement/updaterule/updaterule.component';//模型规则-规则管理-更新版本

const routes: Routes = [
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },//默认首页
  { path: 'app/home', component: IndexComponent },//首页
  { path: 'rule/rulegroup', component: RulegroupComponent },//规则分组
  { path: 'rule/rulemanagement', component: RulemanagementComponent },//规则管理
  { path: 'rule/rulemanagement/addrule', component: AddruleComponent },//规则管理-创建规则
  { path: 'rule/rulemanagement/changerule', component: ChangeruleComponent },//规则管理-修改信息
  { path: 'rule/rulemanagement/seerule', component: SeeruleComponent },//规则管理-查看规则
  { path: 'rule/rulemanagement/updaterule', component: UpdateruleComponent },//规则管理-更新版本
  { path: 'rule/fielddata', component: FielddataComponent },//数据模型
  { path: 'rule/fielddata/seefield', component: SeefieldComponent },//数据模型-查看字段
];
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    PageNavComponent,
    MenuComponent,
    ResourceDirective,
    IndexComponent,
    NavComponent,
    RulegroupComponent,
    FielddataComponent,
    RulemanagementComponent,
    SeefieldComponent,
    SeeruleComponent,
    AddruleComponent,
    ChangeruleComponent,
    UpdateruleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    HttpInterceptorModule,
  ],
  providers: [
    HttpServe,{ provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
