import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule       } from '@angular/platform-browser';
import { HttpModule          } from '@angular/http';
import { StoreModule         } from '@ngrx/store';

import { TranslateModule  } from 'ng2-translate';
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap'
import { CollapseModule   } from 'ng2-bootstrap/components/collapse';

import { AppComponent  } from './app.component';
import { StoreReducers } from './store/reducers.module';
import { SharedModule  } from './shared/modules/shared.module';

import { routing, appRoutingProviders } from './app.routing';

import { ChatPageComponent }  from './pages/chat/chat.component';
import { PageModule } from './pages/page.module';
import { MenuModule } from './menus/menu.module';
import { MainModule } from './main/main.module';

import './rxjs-extensions';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    CollapseModule,
    routing,
    StoreModule.provideStore(StoreReducers),
    TranslateModule.forRoot(),
    MainModule,
    MenuModule,
    PageModule,
  ],
  declarations: [
    AppComponent,
    ChatPageComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'lv' },
    { provide: ComponentsHelper, useClass: ComponentsHelper },
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
