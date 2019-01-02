import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndustryComponent } from './industry.component';
import { IndustryRoutingModule } from './industry-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiSwitchModule } from 'ng2-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpServe } from './../../../layout/service/http-serve.service';

@NgModule({
  imports: [
    CommonModule,
    IndustryRoutingModule,
    SharedModule,
    NgxDatatableModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [IndustryComponent],
  providers: [HttpServe]
})
export class IndustryModule { }
