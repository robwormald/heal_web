import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

var Popover = require('ng2-popover');
var Collapse = require('ng2-bootstrap/ng2-collapse');

import './rxjs-extensions';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { ChatPageComponent, HomePageComponent } from './pages/index';
import {
  AppearancePartialComponent,
  ContainerBlockPartialComponent,
  BBCodePartialComponent,
  NotificationPartialComponent,
  PollMenuPartialComponent,
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
    AppearancePartialComponent,
    ContainerBlockPartialComponent,
    BBCodePartialComponent,
    NotificationPartialComponent,
    PollMenuPartialComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'lv' },
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
