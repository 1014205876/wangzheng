
import { CustomerModule } from './pages/customer/customer.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PlatformRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './shared/service/auth.service';
import { AuthGuardGuard } from './shared/guard/auth-guard.guard';
import { CookieModule } from 'ngx-cookie';
import { HttpService } from './shared/service/http-serve.service';
import { FormsModule } from '@angular/forms';
import { HttpInterceptorModule } from 'ng-http-interceptor';
import { AppLoadModule } from './shared/app-load/app-load.module';
import { LoanInputComponent } from './app/pages/business/loan-input/loan-input.component';

const routes: Routes = [
  { path: '', redirectTo: '/app/home', pathMatch: "full" },
  // { path: 'app', loadChildren: 'app/pages/main/main.module#MainModule',canActivate:[AuthGuardGuard]},
  { path: 'app', loadChildren: 'app/pages/main/main.module#MainModule'},
  // { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' }
];


@NgModule({
  declarations: [
    AppComponent,
    LoanInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CookieModule.forRoot(),
    FormsModule,
    HttpInterceptorModule,
    RouterModule.forRoot(routes),
    AppLoadModule
  ],
  providers: [AuthService,AuthGuardGuard,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
