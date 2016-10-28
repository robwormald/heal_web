import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

var Popover = require('ng2-popover');
var Collapse = require('ng2-bootstrap/ng2-collapse');

import { PollModule } from './pages/poll/poll.module';
import { SharedModule } from './shared/modules/shared.module';

import './rxjs-extensions';
import { AppStore } from './app.store';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { PollMenuComponent } from './menus/poll/poll-menu.component';
import { ChatPageComponent, HomePageComponent } from './pages/index';
import {
  AppearancePartialComponent,
  BBCodePartialComponent,
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
    PollModule,
    Popover.PopoverModule,
    Collapse.CollapseModule,
    routing
  ],
  declarations: [
    AppComponent,
    ChatPageComponent,
    HomePageComponent,

    PollMenuComponent,

    AppearancePartialComponent,
    BBCodePartialComponent,
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
