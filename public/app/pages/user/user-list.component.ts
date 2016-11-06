import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppStore } from './../../app.store';
import { UserList } from './../../objects/index';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'user-list-component',
  templateUrl: './user-list.component.html',
  providers: [UserService]
})

export class UserListComponent {
  userList: any = {};

  constructor(
    private store: AppStore,
    private route: ActivatedRoute,
    private service: UserService,
  ) {
    this.store.changes.pluck('userList').subscribe((userList: UserList) => this.userList = userList);

    this.route.params.subscribe((params: Params) => {
      this.store.setKeyValue('userList', {});
      this.service.getUsers(params['page']);
    });
  }
}
