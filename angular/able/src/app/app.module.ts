
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { HttpInterceptorModule } from 'ng-http-interceptor';
import { HttpInterceptorService } from 'ng-http-interceptor';
import { HttpServe } from './layout/service/http-serve.service';
import { FileUploadService } from './layout/service/file-upload.service';
import { TreeviewModule } from 'ngx-treeview';
import { AppLoadModule } from './layout/app-load/app-load.module';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    HttpInterceptorModule,
    TreeviewModule.forRoot(),
    ToastyModule.forRoot(),
    AppLoadModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    MenuItems,
    HttpInterceptorService,
    HttpServe,
    FileUploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
