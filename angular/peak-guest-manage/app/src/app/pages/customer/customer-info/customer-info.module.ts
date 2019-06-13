import { CustomerInfoComponent } from './customer-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComponentModule } from '../../../shared/component/component.module';

const routes: Routes = [
  { path: '', component: CustomerInfoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentModule
  ],
  declarations: [CustomerInfoComponent]
})
export class CustomerInfoModule { }
