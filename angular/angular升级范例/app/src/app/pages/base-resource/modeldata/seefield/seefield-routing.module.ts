import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeefieldComponent } from './seefield.component'

const routes: Routes = [{
  path: '',
  component: SeefieldComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeefieldRoutingModule { }
