import { Component } from '@angular/core';
import { Store     } from '@ngrx/store';


import { TranslateService  } from 'ng2-translate';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { AppState, User    } from './../../store/constants';

@Component({
  moduleId: module.id,
  templateUrl: './user.component.html',
})

export class UserComponent {
  currentViewUser: User;

  constructor(
    private breadcrumb: BreadcrumbService,
    private store: Store<AppState>,
    private translate: TranslateService,
  ) {
    this.breadcrumb.hideRoute('/users/view');
    this.breadcrumb.hideRoute('/users/list');
    this.breadcrumb.hideRouteRegex('^/users/list/[0-9]');
    this.translate.get(['pages.user.title', 'menus.user.profile']).subscribe((res: string[]) => {
      this.breadcrumb.addFriendlyNameForRoute('/users', res['pages.user.title']);
      this.breadcrumb.addFriendlyNameForRoute('/users/edit', res['menus.user.profile']);
    });
    this.breadcrumb.addCallbackForRouteRegex('^/users/view/[0-9]$', this.setUserTitle.bind(this));
    this.store.select('currentViewUser').subscribe((currentViewUser: User) => this.currentViewUser = currentViewUser);
  }

  private setUserTitle(): string {
    let user = this.currentViewUser;
    return user && user.username || ' ';
  }
}
