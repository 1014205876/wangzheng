import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { selfHttp } from './shared/service/http-service';

import { HomePage } from './page/home/home.page';
import { ProductApplyPage } from './page/product-apply/product-apply.page';
import { PopularizeRegisterPage } from './page/popularize-register/popularize-register.page';

@NgModule({
    declarations: [
        AppComponent,
        HomePage,
        ProductApplyPage,
        PopularizeRegisterPage
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        IonicModule.forRoot(),
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        selfHttp,
        SplashScreen,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
