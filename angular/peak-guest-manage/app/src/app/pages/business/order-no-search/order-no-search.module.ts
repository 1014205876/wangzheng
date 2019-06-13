import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderNoSearchComponent } from './order-no-search.component';

import { ComponentModule } from '../../../shared/component/component.module';
import { Routes, RouterModule } from '@angular/router';


const routes:Routes=[
  {path:'', component:OrderNoSearchComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    RouterModule.forChild(routes),
  ],
  declarations: [OrderNoSearchComponent]
})
export class OrderNoSearchModule { 
  
}
