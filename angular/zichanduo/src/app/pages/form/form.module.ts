import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';//路由

import { HttpServe } from 'src/app/shared/service/http-serve.service';

import { FormComponent } from './form.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: FormComponent },
        ]
    }
];
@NgModule({
    declarations: [FormComponent],
    imports: [
        CommonModule,FormsModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        HttpServe
    ]
})
export class FormModule { }
