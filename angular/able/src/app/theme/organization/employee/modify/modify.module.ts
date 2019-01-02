
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyComponent } from './modify.component';
import { ModifyRoutingModule } from './modify-routing.module';
import { SharedModule } from './../../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiSwitchModule } from 'ng2-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpServe } from './../../../../layout/service/http-serve.service';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    ModifyRoutingModule,
    SharedModule,
    NgxDatatableModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot()
  ],
  declarations: [ModifyComponent],
  providers: [HttpServe]
})
export class ModifyModule { }
