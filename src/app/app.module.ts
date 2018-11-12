import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SideNavComponent } from './page/side-nav/side-nav.component';
import { HeaderComponent } from './page/header/header.component';
import { IntroComponent } from './intro/intro.component';
import { KirbyModule } from '../kirby/kirby.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SideNavComponent,
        HeaderComponent,
        IntroComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        KirbyModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
