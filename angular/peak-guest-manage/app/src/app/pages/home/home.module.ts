import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { ComponentModule } from '../../shared/component/component.module';

const routes:Routes=[
  {path:'',component:HomeComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
