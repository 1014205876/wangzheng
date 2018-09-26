import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Head } from './head/head';
import { Backc } from './background';
import { Consol } from './console';
import { Child } from './child';
import { AddComponent } from './component/add/add.component';
import { HeadComponent } from './pages/head/head.component';

@NgModule({
  declarations: [
    AppComponent,Head,Backc,Child, AddComponent, HeadComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [Consol],
  bootstrap: [AppComponent,Head]
})
export class AppModule { }
