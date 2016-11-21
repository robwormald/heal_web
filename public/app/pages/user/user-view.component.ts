import { Component } from '@angular/core';
import { Store     } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';

import { UserService   } from './user.service';
import { BBCodeService } from './../../shared/services/index';
import { AppState, User, SET_CURRENT_VIEWUSER } from './../../store/constants';

@Component({
  moduleId: module.id,
  selector: 'user-view-component',
  templateUrl: './user-view.component.html',
  providers: [UserService]
})

export class UserViewComponent {
  currentViewUser: User;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private service: UserService,
    private bbcode: BBCodeService,
  ) {
    this.store.select('currentViewUser').subscribe((currentViewUser: User) => this.currentViewUser = currentViewUser);

    this.route.params.subscribe((params: Params) => {
      this.store.dispatch({ type: SET_CURRENT_VIEWUSER, payload: {} });
      this.service.getUser(params['id']);
    });
  }

  parseBBcode(user: User): string {
    return user.parsedSignature || (user.parsedSignature = this.bbcode.parse(user.signature))
  }
}
