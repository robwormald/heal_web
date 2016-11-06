import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppStore } from './../../app.store';
import { UserService } from './user.service';
import { User } from './../../objects/index';

@Component({
  moduleId: module.id,
  selector: 'user-view-component',
  templateUrl: './user-view.component.html',
  providers: [UserService]
})

export class UserViewComponent {
  currentUser: any = {};

  constructor(
    private store: AppStore,
    private route: ActivatedRoute,
    private service: UserService,
  ) {
    this.store.changes.pluck('currentUser').subscribe((currentUser: User) => this.currentUser = currentUser);

    this.route.params.subscribe((params: Params) => {
      // this.store.setKeyValue('currentUser', {});
      this.service.getUser(params['id']);
    });
  }
}
