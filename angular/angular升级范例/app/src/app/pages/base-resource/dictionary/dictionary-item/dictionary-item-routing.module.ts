import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DictionaryItemComponent } from './dictionary-item.component'

const routes: Routes = [{
  path: '',
  component: DictionaryItemComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionaryItemRoutingModule { }
