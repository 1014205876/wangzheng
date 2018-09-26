import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Head } from './head/head';
import { Backc } from './background';
import { Consol } from './console';
import { Child } from './child';

@NgModule({
  declarations: [
    AppComponent,Head,Backc,Child
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [Consol],
  bootstrap: [AppComponent,Head]
})
export class AppModule { }
