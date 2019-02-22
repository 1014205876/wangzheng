
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TabsComponent } from './tabs/tabs.component';
import { ValidateBoxComponent } from './validate-box/validate-box.component';
import { HeaderComponent } from './header/header.component';
import { ToastComponent } from './toast/toast.component';
import { MsgItemComponent } from './msg-item/msg-item.component';
import { LoadingComponent } from './loading/loading.component';
import { ScalableImgComponent } from './scalable-img/scalable-img.component';
import { CalendarComponent } from './calendar/calendar.component';
import { MenuComponent } from './menu/menu.component';
import { SignedComponent } from './signed/signed.component';

import { AppRoutingModule } from './../../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  declarations: [
    CalendarComponent,
    HeaderComponent,
    LoadingComponent,
    MsgItemComponent,
    ScalableImgComponent,
    TabsComponent,
    ToastComponent,
    ValidateBoxComponent,
    MenuComponent,
    SignedComponent
  ],
  exports: [
    CalendarComponent,
    HeaderComponent,
    LoadingComponent,
    MsgItemComponent,
    ScalableImgComponent,
    TabsComponent,
    ToastComponent,
    ValidateBoxComponent,
    MenuComponent,
    SignedComponent
  ]
})
export class ComponentModule { }
