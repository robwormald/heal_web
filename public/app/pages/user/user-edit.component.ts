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
  formData: any = {
    general: [
      // { date: true, name: 'birthday' },
      { input: true, type: 'text', name: 'residence' },
      { textarea: true, name: 'signature', bbcode: true },
    ],
    email: [
      { input: true, type: 'text', name: 'email' },
    ],
    security: [
      { input: true, type: 'password', name: 'password' },
      { input: true, type: 'password', name: 'password_confirmation', text: 'Password 2x' },
    ],
    uploads: [
      { file: true, name: 'avatar_file', validations: { fileSize: 2, fileType: 'image' }, text: 'Avatar' },
    ]
  };
  tabs: any[] = Object.keys(this.formData);
  currentTab: string = this.tabs[0];

  constructor(
    private store: AppStore,
    private service: UserService,
  ) {
    this.service.getUser(0);
    this.store.changes.pluck('currentViewUser').subscribe((currentViewUser: User) => this.currentViewUser = currentViewUser);
  }

  onSubmit(event: any): void {
    this.service.updateUser(this.currentTab, event.form.value);

    if(this.currentTab == 'security' || this.currentTab == 'uploads') {
      event.form.reset();
    }
  }
}
