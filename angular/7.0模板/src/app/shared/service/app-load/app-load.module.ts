import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppLoadService } from './app-load.service';

export function app_load(authLoadService: AppLoadService) {
    return () => authLoadService.appLoad();
}

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        AppLoadService,
        {
            provide: APP_INITIALIZER,
            useFactory: app_load,
            deps: [AppLoadService],
            multi: true
        }
    ]
})
export class AppLoadModule { }
