import { Component } from '@angular/core';

import { User } from './../../objects/index';
import { AppStore } from './../../app.store';

@Component({
  moduleId: module.id,
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html',
})

export class UserMenuComponent {
  currentUser: User;

  constructor(private store: AppStore) {
    this.store.changes.pluck('currentUser').subscribe((currentUser: User) => this.currentUser = currentUser);
  }
}
