import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Nav01Component } from './nav01/nav01.component';
import { Nav02Component } from './nav02/nav02.component';
import { Nav03Component } from './nav03/nav03.component';

const routes: Routes = [
  // { path: 'pages1/nav01', component: Nav01Component },
  // { path: 'pages1/nav02', component: Nav02Component },
  // { path: 'pages1/nav03', component: Nav03Component },
];
@NgModule({
  declarations: [
    Nav01Component,
    Nav02Component,
    Nav03Component
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
