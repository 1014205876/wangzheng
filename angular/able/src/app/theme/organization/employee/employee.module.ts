import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UiSwitchModule } from 'ng2-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { ToastyModule } from 'ng2-toasty';
import { TreeModule } from 'angular-tree-component';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    NgxDatatableModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    TreeModule,
    TreeviewModule.forRoot()
  ],
  declarations: [EmployeeComponent],
  providers: [HttpServe]
})
export class EmployeeModule { }
