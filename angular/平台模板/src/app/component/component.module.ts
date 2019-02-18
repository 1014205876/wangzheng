import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';//ngif，ngfor
import { FormsModule, ReactiveFormsModule } from '@angular/forms';//表单
import { RouterModule } from '@angular/router';//路由

// 引入插件
import { NgZorroAntdModule, NZ_I18N, zh_CN, } from 'ng-zorro-antd';//ng-zerro

// 引入自定义ts组件
import { HttpServe } from '../layout/service/http-serve.service';

// 引入自定义组件
import { AdminComponent } from './admin/admin.component';
import { ResourceDirective } from './directive/resource.directive';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { BoxComponent } from './box/box.component';
import { ForDirective } from './for/for.directive';

@NgModule({
  declarations: [
    AdminComponent,
    ResourceDirective,
    HeaderComponent,
    MenuComponent,
    NavComponent,
    BoxComponent,
    ForDirective,
  ],
  providers: [
    HttpServe,
    {
      provide: NZ_I18N,
      useValue: zh_CN
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule.forRoot(),
  ],
  exports: [
    AdminComponent,
    ResourceDirective,
    HeaderComponent,
    MenuComponent,
    NavComponent,
    BoxComponent,
    ForDirective,
  ],
})
export class ComponentModule { }
