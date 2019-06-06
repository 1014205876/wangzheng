import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateDisposedComponent } from './rate-disposed.component'

const routes: Routes = [{
  path: '',
  component: RateDisposedComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateDisposedRoutingModule { }
