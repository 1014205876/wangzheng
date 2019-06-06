import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndustryComponent } from './industry.component'

const routes: Routes = [{
  path: '',
  component: IndustryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryRoutingModule { }
