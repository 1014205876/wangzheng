import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../shared/component/component.module';
import { HttpService } from '../../../shared/service/http-serve.service';
import { DateTransformService } from '../../../shared/service/date-transform.service';
import { FormsModule } from '@angular/forms';
import	{	NgxDatatableModule	}	from	'@swimlane/ngx-datatable';
 
const routes:Routes=[
  {path:'',component:OrderComponent}
  
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxDatatableModule
  ],
  declarations: [OrderComponent],
  providers:[HttpService, DateTransformService]
})
export class OrderModule { }
