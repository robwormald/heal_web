import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { CollapseModule } from 'ng2-bootstrap/components/collapse';

import { ArticleModule, PollModule, UserModule } from './pages/index';
import { SharedModule } from './shared/modules/shared.module';

import './rxjs-extensions';
import { AppStore } from './app.store';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { PollMenuComponent, OnlineMenuComponent, UserMenuComponent } from './menus/index';
import { ChatPageComponent } from './pages/index';
import {
  NotificationPartialComponent,
  ThemesPickerComponent,

  HeaderComponent,
  FooterComponent,
} from './partials/index';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    ArticleModule,
    PollModule,
    UserModule,
    CollapseModule,
    routing
  ],
  declarations: [
    AppComponent,
    ChatPageComponent,

    PollMenuComponent,
    OnlineMenuComponent,
    UserMenuComponent,

    NotificationPartialComponent,
    ThemesPickerComponent,

    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'lv' },
    appRoutingProviders,
    AppStore
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
