import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }    from './app.component';
import { HeaderComponent } from './templates/header.component';
import { BodyComponent }   from './templates/body.component';
import { ContainerBlockComponent }   from './templates/container-block.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    ContainerBlockComponent,
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
