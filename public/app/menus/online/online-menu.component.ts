import { Component  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store      } from '@ngrx/store';
import { Router, NavigationEnd } from '@angular/router';

import { AppState, User } from './../../store/constants';
import { HomeChannel    } from './../../channels/home.channel';

@Component({
  moduleId: module.id,
  selector: 'online-menu',
  templateUrl: 'online-menu.component.html',
  providers: [HomeChannel]
})

export class OnlineMenuComponent {
  onlineUsers: Observable<User[]>;
  currentUser: User;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private channel: HomeChannel,
  ) {
    this.onlineUsers = this.store.select('onlineUsers');
    this.store.select('currentUser').subscribe((currentUser: User) => this.currentUser = currentUser);

    router.events
      .filter((event) => event instanceof NavigationEnd)
      .filter((event) => this.currentUser.location != event.url)
      .subscribe((event) => this.channel.perform('location', { location: event.url }));
  }
}
