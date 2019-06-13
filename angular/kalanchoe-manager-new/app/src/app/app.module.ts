import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router'
import { AppLoadModule } from './shared/app-load/app-load.module';

import { MainModule } from './pages/main/main.module';

import { HttpService } from './shared/service/http-serve/http.service'

const routes: Routes=[
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    RouterModule.forRoot(routes),
    AppLoadModule,
    MainModule
  ],
  providers:[
    HttpService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }