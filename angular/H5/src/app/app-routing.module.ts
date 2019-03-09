import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MsgComponent } from './pages/msg/msg.component';
import { MineComponent } from './pages/mine/mine.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';

import { CheckEtpComponent } from './pages/check-etp/check-etp.component';
import { ContractModelComponent } from './pages/contract-model/contract-model.component';
import { ContractDetailComponent } from './pages/contract-detail/contract-detail.component';
import { DownInformationComponent } from './pages/down-information/down-information.component';
import { EtpListComponent } from './pages/etp-list/etp-list.component';
import { EtpReportComponent } from './pages/etp-report/etp-report.component';
import { EtpcCertificationComponent } from './pages/etpc-certification/etpc-certification.component';
import { GetInformationComponent } from './pages/get-information/get-information.component';
import { HelpDetailsComponent } from './pages/help-details/help-details.component';
import { HelpListComponent } from './pages/help-list/help-list.component';
import { LoanComponent } from './pages/loan/loan.component';
import { LoanSucComponent } from './pages/loan-suc/loan-suc.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrderListsComponent } from './pages/order-lists/order-lists.component';
import { PerReportComponent } from './pages/per-report/per-report.component';
import { ProductComponent } from './pages/product/product.component';
import { RealControllerComponent } from './pages/real-controller/real-controller.component';
import { RepayInfoComponent } from './pages/repay-info/repay-info.component';
import { ReportInfoComponent } from './pages/report-info/report-info.component';
import { RequireAuthorizationComponent } from './pages/require-authorization/require-authorization.component';
import { StepTelComponent } from './pages/step-tel/step-tel.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

import { HasLoginGuard } from './shared/guard/has-login.guard';

import { BannerComponent } from './pages/banner/banner.component';

import { FormChildComponent } from './pages/form-child/form-child.component';
import { FormMultiPicComponent } from './pages/form-multi-pic/form-multi-pic.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterSuccessComponent } from './pages/register-success/register-success.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: "full" },
  { path: 'login', component: LoginComponent },//登录页面
  { path: 'register', component: RegisterComponent },//注册页面
  { path: 'register-success', component: RegisterSuccessComponent },//注册成功页面
  { path: 'home', component: HomeComponent },//首页
  { path: 'product', component: ProductComponent },//贷款申请页面
  { path: 'loan', component: LoanComponent, canActivate: [HasLoginGuard] },
  { path: 'loan-suc', component: LoanSucComponent, canActivate: [HasLoginGuard] },
  { path: 'contract-model', component: ContractModelComponent },
  { path: 'contract-detail', component: ContractDetailComponent },
  { path: 'banner/:id', component: BannerComponent, canActivate: [HasLoginGuard] },
  { path: 'msg', component: MsgComponent, canActivate: [HasLoginGuard] },
  { path: 'mine', component: MineComponent, canActivate: [HasLoginGuard] },
  { path: 'etpc-certification', component: EtpcCertificationComponent, canActivate: [HasLoginGuard] },
  { path: 'about', component: AboutComponent, canActivate: [HasLoginGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [HasLoginGuard] },
  { path: 'help-list', component: HelpListComponent, canActivate: [HasLoginGuard] },
  { path: 'help-detail/:id', component: HelpDetailsComponent, canActivate: [HasLoginGuard] },
  { path: 'get-information', component: GetInformationComponent, canActivate: [HasLoginGuard] },
  { path: 'check-etp', component: CheckEtpComponent, canActivate: [HasLoginGuard] },
  { path: 'down-information', component: DownInformationComponent, canActivate: [HasLoginGuard] },
  { path: 'etp-list', component: EtpListComponent, canActivate: [HasLoginGuard] },
  { path: 'order-detail', component: OrderDetailComponent, canActivate: [HasLoginGuard] },
  { path: 'order-lists', component: OrderListsComponent, canActivate: [HasLoginGuard] },
  { path: 'per-report', component: PerReportComponent, canActivate: [HasLoginGuard] },
  { path: 'etp-report', component: EtpReportComponent, canActivate: [HasLoginGuard] },
  { path: 'real-controller', component: RealControllerComponent, canActivate: [HasLoginGuard] },
  { path: 'repay-info', component: RepayInfoComponent, canActivate: [HasLoginGuard] },
  { path: 'report-info', component: ReportInfoComponent, canActivate: [HasLoginGuard] },
  { path: 'require-authorization', component: RequireAuthorizationComponent, canActivate: [HasLoginGuard] },
  { path: 'step-tel', component: StepTelComponent, canActivate: [HasLoginGuard] },
  { path: 'form-child', component: FormChildComponent, canActivate: [HasLoginGuard] },
  { path: 'form-multi-pic', component: FormMultiPicComponent, canActivate: [HasLoginGuard] },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule],
  providers: [HasLoginGuard]
})
export class AppRoutingModule { }
