import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule       } from '@angular/platform-browser';
import { HttpModule, Http    } from '@angular/http';
import { StoreModule         } from '@ngrx/store';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap'
import { CollapseModule   } from 'ng2-bootstrap/components/collapse';

import { AppComponent  } from './app.component';
import { StoreReducers } from './store/reducers.module';
import { SharedModule  } from './shared/modules/shared.module';

import { routing, appRoutingProviders } from './app.routing';

import { ChatPageComponent }  from './pages/chat/chat.component';
import { ALL_PAGES    } from './pages/index';
import { ALL_MENUS    } from './menus/index';
import { ALL_PARTIALS } from './main/index';

import './rxjs-extensions';

export function translateLoaderFactory(http: Http) {
  return new TranslateStaticLoader(http, './i18n', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    CollapseModule,
    routing,
    StoreModule.provideStore(StoreReducers),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: translateLoaderFactory,
      deps: [Http]
    }),
    ALL_PAGES
  ],
  declarations: [
    AppComponent,
    ChatPageComponent,

    ALL_MENUS,
    ALL_PARTIALS,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'lv' },
    { provide: ComponentsHelper, useClass: ComponentsHelper },
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
