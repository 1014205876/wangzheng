import { NgModule } from '@angular/core';
import { ResourceDirective } from './directive/resource.directive';


@NgModule({
  imports: [
  ],
  declarations: [
    ResourceDirective
  ],
  exports: [
    ResourceDirective
  ]
})
export class DirectiveModule { }
