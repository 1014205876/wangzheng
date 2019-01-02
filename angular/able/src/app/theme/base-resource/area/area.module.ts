import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area.component';
import { AreaRoutingModule } from './area-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';

import { HttpServe } from './../../../layout/service/http-serve.service';

@NgModule({
  imports: [
    CommonModule,
    AreaRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule
  ],
  declarations: [AreaComponent],
  providers: [HttpServe]
})
export class AreaModule { }
