import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessResourceRoutingModule } from './business-resource-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    BusinessResourceRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: []
})
export class BusinessResourceModule { }
