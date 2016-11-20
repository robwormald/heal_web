import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ComponentsHelper    } from 'ng2-bootstrap/ng2-bootstrap'
import { TranslateService    } from 'ng2-translate';
import { EmojiSupportService } from './global/index';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [EmojiSupportService]
})

export class AppComponent implements OnInit {
  constructor(
    private emojiSupport: EmojiSupportService,
    private viewContainerRef: ViewContainerRef,
    private componentsHelper: ComponentsHelper,
    private vcr: ViewContainerRef,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.componentsHelper.setRootViewContainerRef(this.vcr);
    router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => window.scroll(0, 0));
  }

  ngOnInit(): void {
    this.emojiSupport.init();
  }
}
