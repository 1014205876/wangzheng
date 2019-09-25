import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateFormatPipe } from './date-format.pipe';
import { HtmlPipe } from './html-style.pipe';
import { ToFixedPipe } from './to-fixed.pipe';

@NgModule({
    declarations: [
        DateFormatPipe,
        HtmlPipe,
        ToFixedPipe,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DateFormatPipe,
        HtmlPipe,
        ToFixedPipe,
    ],
})

export class PipesModule { }