import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

// import { HttpModule } from '@angular/http';
// import { HttpServe } from './layout/service/http-serve.service';

import { HttpInterceptorModule } from 'ng-http-interceptor';
import { NgZorroAntdModule, NZ_I18N, zh_CN, } from 'ng-zorro-antd';

import { AppComponent } from './app.component';

import { ComponentModule } from './component/component.module';

const routes: Routes = [
  // { path: '', redirectTo: '/pages', pathMatch: 'full' },
  { path: '', loadChildren: './pages/pages.module#PagesModule' },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [
    // HttpServe,
    {
      provide: NZ_I18N,
      useValue: zh_CN
    }
  ],
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    // HttpModule,
    HttpInterceptorModule,
    NgZorroAntdModule.forRoot(),
    ComponentModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
