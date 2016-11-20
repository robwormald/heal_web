import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { Store } from '@ngrx/store';

import { AppState, User } from './../../store/constants';

@Component({
  moduleId: module.id,
  templateUrl: './user.component.html',
})

export class UserComponent {
  currentViewUser: User;

  constructor(
    private breadcrumb: BreadcrumbService,
    private store: Store<AppState>,
  ) {
    this.breadcrumb.hideRoute('/users/view');
    this.breadcrumb.hideRoute('/users/list');
    this.breadcrumb.hideRouteRegex('^/users/list/[0-9]');
    this.breadcrumb.addFriendlyNameForRoute('/users', 'Users');
    this.breadcrumb.addFriendlyNameForRoute('/users/edit', 'Profile');
    this.breadcrumb.addCallbackForRouteRegex('^/users/view/[0-9]$', this.setUserTitle.bind(this));
    this.store.select('currentViewUser').subscribe((currentViewUser: User) => this.currentViewUser = currentViewUser);
  }

  private setUserTitle(): string {
    let user = this.currentViewUser;
    return user && user.username || ' ';
  }
}
