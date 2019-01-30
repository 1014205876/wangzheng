import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';


// import { HttpModule } from '@angular/http';
// import { HttpServe } from '../layout/service/http-serve.service';

import { HttpInterceptorModule } from 'ng-http-interceptor';
import { NgZorroAntdModule, NZ_I18N, zh_CN, } from 'ng-zorro-antd';

import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';
import { SwitchComponent } from './switch/switch.component';

// import { registerLocaleData } from '@angular/common';
// import zh from '@angular/common/locales/zh';
// registerLocaleData(zh);

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/index', pathMatch: 'full' },
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
    // HttpServe,
    {
      provide: NZ_I18N,
      useValue: zh_CN
    }
  ],
  imports: [
    CommonModule,
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    // HttpModule,
    HttpInterceptorModule,
    NgZorroAntdModule.forRoot(),
  ],
  exports: [
  ]
})
export class PagesModule { }
