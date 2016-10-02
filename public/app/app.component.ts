import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';

import { EmojiSupportService } from './global/index';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [EmojiSupportService]
})

export class AppComponent implements OnInit {
  isCollapsed: boolean = true;

  constructor(
    router: Router,
    private emojiSupport: EmojiSupportService
  ) {
    router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        this.isCollapsed = true;
      }
    });
  }

  ngOnInit(): void {
    this.emojiSupport.init();
  }
}
