import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState, UserList } from './../../store/constants';
import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'user-list-component',
  templateUrl: './user-list.component.html',
  providers: [UserService]
})

export class UserListComponent {
  userList: Observable<UserList>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private service: UserService,
  ) {
    this.userList = this.store.select('userList');

    this.route.params.subscribe((params: Params) => {
      this.service.getUsers(params['page']);
    });
  }
}
