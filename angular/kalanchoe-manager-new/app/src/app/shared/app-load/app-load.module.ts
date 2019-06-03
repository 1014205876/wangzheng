import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

export function get_settings() {
    return () =>{};
}

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: get_settings,
            multi: true
        }
    ],
    declarations: []
})
export class AppLoadModule { }
