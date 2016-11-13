import { Component } from '@angular/core';

import { AppStore } from './../../app.store';
import { User } from './../../objects/index';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'user-edit-component',
  templateUrl: './user-edit.component.html',
  providers: [UserService]
})

export class UserEditComponent {
  currentViewUser: any = {};
  tabsData: any = {
    general: [
      { date: true, name: 'birthday' },
      { input: true, type: 'text', name: 'residence' },
      { textarea: true, name: 'signature', bbcode: true },
    ],
    security: [
      { input: true, type: 'text', name: 'email' },
      { input: true, type: 'password', name: 'password' },
      { input: true, type: 'password', name: 'password_confirmation', text: 'Password 2x' },
    ],
    uploads: [
      'avatar',
    ]
  };
  tabsKeys: any[] = Object.keys(this.tabsData);
  currentTab: string = this.tabsKeys[0];

  constructor(
    private store: AppStore,
    private service: UserService,
  ) {
    this.service.getUser(0);
    this.store.changes.pluck('currentViewUser').subscribe((currentViewUser: User) => this.currentViewUser = currentViewUser);
  }

  onSubmit(event: any): void {
    console.error(event);
  }

  tabClassName(tab: string): string {
    const className = 'capital-letter';
    return className + (this.currentTab == tab ? ' active' : '');
  }

  switchTab(tab: string): void {
    this.currentTab = tab;
  }
}
