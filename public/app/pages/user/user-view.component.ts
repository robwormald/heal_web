import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppStore } from './../../app.store';
import { UserService } from './user.service';
import { BBCodeService } from './../../global/index';
import { User } from './../../objects/index';

@Component({
  moduleId: module.id,
  selector: 'user-view-component',
  templateUrl: './user-view.component.html',
  providers: [UserService, BBCodeService]
})

export class UserViewComponent {
  currentViewUser: any = {};

  constructor(
    private store: AppStore,
    private route: ActivatedRoute,
    private service: UserService,
    private bbcode: BBCodeService,
  ) {
    this.store.changes.pluck('currentViewUser').subscribe((currentViewUser: User) => this.currentViewUser = currentViewUser);

    this.route.params.subscribe((params: Params) => {
      this.service.getUser(params['id']);
    });
  }

  parseBBcode(user: User): string {
    return user.parsedSignature || (user.parsedSignature = this.bbcode.parse(user.signature))
  }
}
