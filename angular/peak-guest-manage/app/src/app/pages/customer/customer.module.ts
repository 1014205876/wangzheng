import { DateTransformService } from '../../shared/service/date-transform.service';
import { NgModule, PlatformRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentModule } from './../../shared/component/component.module';

import { HttpService } from '../../shared/service/http-serve.service';
import { FormsModule } from '@angular/forms';
import {	NgxDatatableModule }	from	'@swimlane/ngx-datatable';

const routes: Routes = [
  { path: '', component: CustomerComponent}
];

 
@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ],
  declarations: [CustomerComponent],
  providers:[HttpService,DateTransformService]
})
export class CustomerModule { }

