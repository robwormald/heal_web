import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

var Popover = require('ng2-popover');
var Collapse = require('ng2-bootstrap/ng2-collapse');

import './rxjs-extensions';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { PollMenuComponent } from './menus/poll/poll-menu.component';
import { ChatPageComponent, HomePageComponent } from './pages/index';
import {
  AppearancePartialComponent,
  ContainerBlockPartialComponent,
  BBCodePartialComponent,
  NotificationPartialComponent,
  PollPartialComponent,
} from './partials/index';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
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
    ContainerBlockPartialComponent,
    BBCodePartialComponent,
    NotificationPartialComponent,
    PollPartialComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'lv' },
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
