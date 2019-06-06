import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { MenuLoadService } from '../menu-load/menu-load.service';

export function get_settings(menuLoadService: MenuLoadService) {
  return () => menuLoadService.getSettings();
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    MenuLoadService,
    { provide: APP_INITIALIZER, useFactory: get_settings, deps: [MenuLoadService], multi: true }
  ],
  declarations: []
})
export class AppLoadModule { }
