import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Pages03Component } from '../pages03/pages03.component';
import { Pages04Component } from '../pages04/pages04.component';

const routes: Routes = [
];
@NgModule({
  declarations: [
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
