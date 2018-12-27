import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CooperationComponent } from './cooperation.component';
import { CooperationRoutingModule } from './cooperation-routing.module';

import { SharedModule } from './../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ng2-ui-switch';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    CooperationRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule,
    ToastyModule.forRoot()
  ],
  declarations: [CooperationComponent],
  providers: [HttpServe]
})
export class CooperationModule { }
