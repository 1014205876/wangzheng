import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';
import { SpaceComponent } from './space/space.component';
import { PageNavComponent } from './page-nav/page-nav.component';

/** 引入ng-zorro */
import { NgZorroAntdModule } from 'ng-zorro-antd';

/** 注册语言包 */
// import zh from '@angular/common/locales/zh';
// import { registerLocaleData } from '@angular/common';
// registerLocaleData(zh);

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [
    TinyEditorComponent,
    SpaceComponent,
    PageNavComponent
  ],
  exports: [
    TinyEditorComponent,
    SpaceComponent,
    PageNavComponent
  ]
})
export class ComponentModule { }
