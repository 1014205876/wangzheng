import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { Backc } from './background';
import { Consol } from './console';
import { Child } from './child';
import { AddComponent } from './component/add/add.component';
import { HeadComponent } from './pages/head/head.component';
import { IndexComponent } from './pages/index/index.component';
import { Pages02Component } from './pages/pages02/pages02.component';
import { Pages03Component } from './pages/pages03/pages03.component';
import { Pages04Component } from './pages/pages04/pages04.component';
import { Nav01Component } from './pages/pages02/nav01/nav01.component';
import { Nav02Component } from './pages/pages02/nav02/nav02.component';
import { Nav03Component } from './pages/pages02/nav03/nav03.component';
import { LoginComponent } from './pages/login/login.component';
import { ChangedateComponent } from './component/changedate/changedate.component';
import { LessComponent } from './component/less/less.component';
import { ComponentComponent } from './component/component/component.component';
// import { QuillModule } from 'ngx-quill';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';//ui表格
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  {
    path: 'pages2', component: Pages02Component,
    children: [
      { path: 'nav01', component: Nav01Component },
      { path: 'nav02', component: Nav02Component },
      { path: 'nav03', component: Nav03Component },
    ],
  },
  { path: 'pages3', component: Pages03Component },
  { path: 'pages4', component: Pages04Component },
];
@NgModule({
  declarations: [
    AppComponent,
    Backc,
    Child,
    AddComponent,
    HeadComponent,
    IndexComponent,
    Pages02Component,
    Pages03Component,
    Pages04Component,
    Nav01Component,
    Nav02Component,
    Nav03Component,
    LoginComponent,
    ChangedateComponent,
    LessComponent,
    ComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    // QuillModule,
    CKEditorModule,
    NgxDatatableModule
  ],
  providers: [Consol],
  bootstrap: [AppComponent]
})
export class AppModule { }
