import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HttpInterceptorModule } from 'ng-http-interceptor';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { HttpModule } from '@angular/http';
import { HttpServe } from './layout/service/http-serve.service';

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
  { path: 'app/business/approve', component: FielddataComponent },
  { path: 'see', component: SeefieldComponent },
  { path: 'app/business/authorize', component: RulegroupComponent },
  { path: 'app/business/order', component: RulemanagementComponent },
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
