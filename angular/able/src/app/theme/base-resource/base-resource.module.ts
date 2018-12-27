
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseResourceRoutingModule } from './base-resource-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BaseResourceRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class BaseResourceModule { }
