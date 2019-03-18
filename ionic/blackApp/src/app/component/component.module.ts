import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {BackComponent} from './back/back.component'

@NgModule({
    declarations: [
        BackComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports:[
        BackComponent
    ]
})
export class ComponentModule { }
