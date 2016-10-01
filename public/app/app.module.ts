import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

var Popover = require('ng2-popover');
var Collapse = require('ng2-bootstrap/ng2-collapse');

import './rxjs-extensions';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent }    from './app.component';
import { HeaderComponent } from './templates/header.component';
import { BodyComponent }   from './templates/body.component';
import { HomeComponent }   from './home/home.component';
import { ChatComponent }   from './chat/chat.component';
import { AppearanceComponent }   from './appearance/appearance.component';
import { ContainerBlockComponent }   from './templates/container-block.component';
import { BBCodeComponent } from './templates/partials/bbcode/bbcode.component';
import { NotificationComponent } from './templates/partials/notification/notification.component';
import { PollComponent } from './poll/poll.component';

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
    HeaderComponent,
    BodyComponent,
    HomeComponent,
    ChatComponent,
    AppearanceComponent,
    ContainerBlockComponent,
    BBCodeComponent,
    NotificationComponent,
    PollComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'lv' },
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
