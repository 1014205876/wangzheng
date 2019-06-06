import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtendedDisposedComponent } from './extended-disposed.component'

const routes: Routes = [{
  path: '',
  component: ExtendedDisposedComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtendedDisposedRoutingModule { }
