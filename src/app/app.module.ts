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
import {PoiDetailPage} from './poi-detail/poi-detail.page';
import {RatingComponent} from './rating/rating.component';
import {CommentThreadComponent} from './comment-thread/comment-thread.component';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicRatingModule} from 'ionic4-rating/dist';

@NgModule({
    declarations: [AppComponent, PoiDetailPage, RatingComponent, CommentThreadComponent],
    entryComponents: [PoiDetailPage, CommentThreadComponent],
    imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, IonicRatingModule],
    providers: [
        StatusBar,
        SplashScreen,
        HttpClient,
        AlertService,
        Geolocation,
        PoiDetailPage,
        CommentThreadComponent,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
