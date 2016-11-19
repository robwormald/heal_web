import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { User } from './../../objects/index';
import { OnlineMenuService } from './online-menu.service';
import { WebsocketService } from './../../global/index';

@Component({
  moduleId: module.id,
  selector: 'online-menu',
  templateUrl: 'online-menu.component.html',
  providers: [OnlineMenuService, WebsocketService]
})

export class OnlineMenuComponent implements OnDestroy {
  onlineUsers: Observable<User[]>;

  constructor(
    private store: Store<User[]>,
    private router: Router,
    private service: OnlineMenuService,
  ) {
    this.onlineUsers = this.store.select('onlineUsers');
    this.service.subscribe();

    router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => this.service.perform(event.url));
  }

  ngOnDestroy(): void {
    this.service.unsubscribe();
  }
}
