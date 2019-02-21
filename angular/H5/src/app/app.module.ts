
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CookieModule, CookieService } from 'ngx-cookie';
import { HttpInterceptorModule } from 'ng-http-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
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
import { StartUpComponent } from './pages/start-up/start-up.component';
import { StepTelComponent } from './pages/step-tel/step-tel.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FormMultiPicComponent } from './pages/form-multi-pic/form-multi-pic.component';

import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { FormChildComponent } from './pages/form-child/form-child.component';

import { ComponentModule } from './shared/component/component.module';
import { HttpService } from './shared/service/http-serve.service';
import { AuthService } from './shared/service/auth.service';
import { CloneObjService } from './shared/service/clone-obj.service';
import { HasLoginGuard } from './shared/guard/has-login.guard';

import { BannerComponent } from './pages/banner/banner.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterSuccessComponent } from './pages/register-success/register-success.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MsgComponent,
    MineComponent,
    AboutComponent,
    CheckEtpComponent,
    ContractModelComponent,
    DownInformationComponent,
    EtpListComponent,
    EtpReportComponent,
    EtpcCertificationComponent,
    GetInformationComponent,
    HelpDetailsComponent,
    HelpListComponent,
    LoginComponent,
    LoanComponent,
    LoanSucComponent,
    OrderDetailComponent,
    OrderListsComponent,
    PerReportComponent,
    ProductComponent,
    RealControllerComponent,
    RepayInfoComponent,
    ReportInfoComponent,
    RequireAuthorizationComponent,
    StartUpComponent,
    StepTelComponent,
    BannerComponent,
    CalendarComponent,
    FormChildComponent,
    ContractDetailComponent,
    FormMultiPicComponent,
    RegisterComponent,
    RegisterSuccessComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpInterceptorModule,
    SwiperModule,
    CalendarModule,
    DropdownModule,
    BrowserAnimationsModule,
    DynamicFormModule,
    ComponentModule,
    AppRoutingModule
  ],
  providers: [
    HasLoginGuard,
    HttpService,
    AuthService,
    CookieService,
    CloneObjService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  exports: [FormChildComponent]
})
export class AppModule { }
