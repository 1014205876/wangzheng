import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeModifyComponent } from './employee-modify.component'

const routes: Routes = [{
  path: '',
  component: EmployeeModifyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeModifyRoutingModule { }
