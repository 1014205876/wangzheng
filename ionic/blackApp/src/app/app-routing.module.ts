import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './page/home/home.page';
import { Home1Page } from './page/home/home1/home1.page';
import { Home2Page } from './page/home/home2/home2.page';
import { BackPage } from './page/back/back.page';
import { Back1Page } from './page/back/back1/back1.page';
import { Back2Page } from './page/back/back2/back2.page';
import { TabPage } from './page/tab/tab.page';
import { Tab1Page } from './page/tab/tab1/tab1.page';
import { Tab2Page } from './page/tab/tab2/tab2.page';
import { Tab3Page } from './page/tab/tab3/tab3.page';
import { Tab4Page } from './page/tab/tab4/tab4.page';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home', component: HomePage, children: [
            { path: '', redirectTo: 'home1', pathMatch: 'full' },
            { path: 'home1', component: Home1Page, },
            { path: 'home2', component: Home2Page, },
        ]
    },
    {
        path: 'back', component: BackPage, children: [
            { path: '', redirectTo: 'back1', pathMatch: 'full' },
            { path: 'back1', component: Back1Page, },
            { path: 'back2', component: Back2Page, },
        ]
    },
    {
        path: 'tab', component: TabPage, children: [
            { path: '', redirectTo: 'tab1', pathMatch: 'full' },
            { path: 'tab1', component: Tab1Page, },
            { path: 'tab2', component: Tab2Page, },
            { path: 'tab3', component: Tab3Page, },
            { path: 'tab4', component: Tab4Page, },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
