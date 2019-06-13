import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderResultComponent } from './order-result.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/primeng';
import { ComponentModule } from '../../../shared/component/component.module';
import { HttpService } from '../../../shared/service/http-serve.service';
import { DateTransformService } from './../../../shared/service/date-transform.service';


const routes: Routes = [
  { path: '', component: OrderResultComponent, }
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    CalendarModule,
    RouterModule.forChild(routes)
  ],
  providers: [HttpService,DateTransformService],
  declarations: [OrderResultComponent]
})
export class OrderResultModule { }
