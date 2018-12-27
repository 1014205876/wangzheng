import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryComponent } from './dictionary.component';
import { DictionaryRoutingModule } from './dictionary-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiSwitchModule } from 'ng2-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    SharedModule,
    NgxDatatableModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot()
  ],
  declarations: [DictionaryComponent]
})
export class DictionaryModule { }
