import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, User } from './../../store/constants';

@Component({
  moduleId: module.id,
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html',
})

export class UserMenuComponent {
  currentUser: User;

  constructor(private store: Store<AppState>) {
    this.store.select('currentUser').subscribe((currentUser: User) => this.currentUser = currentUser);
  }
}
