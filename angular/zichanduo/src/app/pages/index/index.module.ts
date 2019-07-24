import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';//路由

import { HttpServe } from '../../../../src/app/shared/service/http-serve.service';

import { IndexComponent } from './index.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: IndexComponent },
        ]
    }
];
@NgModule({
    declarations: [IndexComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        HttpServe
    ]
})
export class IndexModule { }
