import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {AlertService} from './_services/alert-service.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {AddFriendCrawlPage} from './add-friend-crawl/add-friend-crawl.page';
import {AddPoiCrawlPage} from './add-poi-crawl/add-poi-crawl.page';



@NgModule({
    declarations: [AppComponent, AddFriendCrawlPage, AddPoiCrawlPage],
    entryComponents: [AddFriendCrawlPage, AddPoiCrawlPage],
    imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        HttpClient,
        AlertService,
        Geolocation,
        AddFriendCrawlPage,
        AddPoiCrawlPage,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
