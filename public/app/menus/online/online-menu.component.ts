import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User } from './../../objects/index';
import { AppStore } from './../../app.store';
import { OnlineMenuService } from './online-menu.service';
import { WebsocketService } from './../../global/index';

@Component({
  moduleId: module.id,
  selector: 'online-menu',
  templateUrl: 'online-menu.component.html',
  providers: [OnlineMenuService, WebsocketService]
})

export class OnlineMenuComponent implements OnDestroy {
  onlineUsers: User[] = [];

  constructor(
    private store: AppStore,
    private router: Router,
    private service: OnlineMenuService,
  ) {
    this.store.changes.pluck('onlineUsers').subscribe((onlineUsers: User[]) => this.onlineUsers = onlineUsers);
    this.service.subscribe();

    router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => this.service.perform(event.url));
  }

  ngOnDestroy(): void {
    this.service.unsubscribe();
  }
}
