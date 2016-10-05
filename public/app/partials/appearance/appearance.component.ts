import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';

import { User } from './../../objects/index';
import { AppStore } from './../../app.store';
import { AppearanceService } from './appearance.service';

@Component({
  moduleId: module.id,
  selector: 'online-users',
  templateUrl: 'appearance.component.html',
  providers: [AppearanceService]
})

export class AppearancePartialComponent implements OnDestroy {
  onlineUsers: User[] = [];

  constructor(
    private store: AppStore,
    private router: Router,
    private appearanceService: AppearanceService,
  ) {
    this.store.changes.pluck('onlineUsers').subscribe((onlineUsers: User[]) => this.onlineUsers = onlineUsers);
    this.appearanceService.subscribe();

    router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        this.appearanceService.perform(event.url);
      }
    });
  }

  ngOnDestroy(): void {
    this.appearanceService.unsubscribe();
  }
}
