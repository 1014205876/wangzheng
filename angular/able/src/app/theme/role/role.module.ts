
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleRoutingModule } from './role-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: []
})
export class RoleModule { }
