import { HttpService } from './../../../shared/service/http-serve.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveComponent } from './approve.component';

import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../shared/component/component.module';
import { FormsModule } from '@angular/forms';
import	{	NgxDatatableModule	}	from	'@swimlane/ngx-datatable';

const routes:Routes=[
  {path:'',component:ApproveComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ],
  declarations: [ApproveComponent],
  providers: [HttpService]
})
export class ApproveModule { }
