import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomePage } from './page/home/home.page';
import { ProductApplyPage } from './page/product-apply/product-apply.page';
import { PopularizeRegisterPage } from './page/popularize-register/popularize-register.page';

const routes: Routes = [
    { path: 'product-apply', component: ProductApplyPage },
    { path: 'home', component: HomePage },
    { path: 'popularize-register', component: PopularizeRegisterPage },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
