import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductModifyComponent } from './product-modify.component'

const routes: Routes = [{
  path: '',
  component: ProductModifyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductModifyRoutingModule { }
