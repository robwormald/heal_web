import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store                 } from '@ngrx/store';

import { ComponentsHelper    } from 'ng2-bootstrap/ng2-bootstrap'
import { TranslateService    } from 'ng2-translate';
import { EmojiSupportService } from './shared/services/index';
import { HomeChannel         } from './channels/home.channel';

import { AppState, UserPreference, SET_CURRENT_USER, CURRENT_PREFERENCE_SET } from './store/constants';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [EmojiSupportService, HomeChannel]
})

export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private emojiSupport: EmojiSupportService,
    private viewContainerRef: ViewContainerRef,
    private componentsHelper: ComponentsHelper,
    private vcr: ViewContainerRef,
    private router: Router,
    private translate: TranslateService,
    private store: Store<AppState>,
    private channel: HomeChannel,
  ) {
    this.componentsHelper.setRootViewContainerRef(this.vcr);
    router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => window.scroll(0, 0));
  }

  ngOnInit(): void {
    let userData = window['userData'];
    this.store.dispatch({ type: SET_CURRENT_USER, payload: userData.current_user });
    this.store.dispatch({ type: CURRENT_PREFERENCE_SET, payload: userData.preferences });

    this.store.select('currentPreference')
      .subscribe((currentPreference: UserPreference) => this.translate.use(currentPreference.language || 'en'));

    this.emojiSupport.init();

    this.channel.subscribe();
  }

  ngOnDestroy(): void {
    this.channel.unsubscribe();
  }
}
