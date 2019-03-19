import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { FormsModule } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ComponentModule } from './component/component.module';

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

@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        Home1Page,
        Home2Page,
        BackPage,
        Back1Page,
        Back2Page,
        TabPage,
        Tab1Page,
        Tab2Page,
        Tab3Page,
        Tab4Page,
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        FormsModule,
        AppRoutingModule,
        ComponentModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
