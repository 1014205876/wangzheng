import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** 引入自定义组件 */
import { PageNavComponent } from './page-nav/page-nav.component';
import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TinyEditorComponent,
    PageNavComponent,
  ],
  exports: [
    TinyEditorComponent,
    PageNavComponent,
  ]
})
export class ComponentModule { }
