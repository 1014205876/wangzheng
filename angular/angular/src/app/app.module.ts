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

const routes: Routes = [
  { path: '', redirectTo: '/pages1', pathMatch: 'full' },
  { path: 'pages4', component: IndexComponent },
  { path: 'pages1', component: Pages02Component },
  { path: 'pages2', component: Pages03Component },
  { path: 'pages3', component: Pages04Component },
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
    Pages04Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [Consol],
  bootstrap: [AppComponent]
})
export class AppModule { }