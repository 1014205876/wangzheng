import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRateDisposed } from './edit-rate-disposed.component'

const routes: Routes = [{
  path: '',
  component: EditRateDisposed
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRateDisposedRoutingModule { }
