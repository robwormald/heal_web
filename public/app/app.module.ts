import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

import './rxjs-extensions';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent }    from './app.component';
import { HeaderComponent } from './templates/header.component';
import { BodyComponent }   from './templates/body.component';
import { HomeComponent }   from './home/home.component';
import { ChatComponent }   from './chat/chat.component';
import { ContainerBlockComponent }   from './templates/container-block.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    HomeComponent,
    ChatComponent,
    ContainerBlockComponent,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
