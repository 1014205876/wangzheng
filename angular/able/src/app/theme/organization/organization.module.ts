import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: []
})
export class OrganizationModule { }
