import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import { AppStore } from './../../app.store';

@Component({
  moduleId: module.id,
  templateUrl: './user.component.html',
})

export class UserComponent {
  constructor(
    private breadcrumb: BreadcrumbService,
    private store: AppStore,
  ) {
    this.breadcrumb.hideRoute('/users/view');
    this.breadcrumb.hideRoute('/users/list');
    this.breadcrumb.hideRouteRegex('^/users/list/[0-9]');
    this.breadcrumb.addFriendlyNameForRoute('/users', 'Users');
    // this.breadcrumb.addCallbackForRouteRegex('^/users/view/[0-9]$', this.setUserTitle.bind(this));
  }

  private setUserTitle(): string {
    let user = this.store.getKeyValue('currentUser');
    return user.title || ' ';
  }
}
