import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from './../../objects/index';

@Component({
  moduleId: module.id,
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html',
})

export class UserMenuComponent {
  currentUser: User;

  constructor(private store: Store<User>) {
    this.store.select('currentUser').subscribe((currentUser: User) => this.currentUser = currentUser);
  }
}
