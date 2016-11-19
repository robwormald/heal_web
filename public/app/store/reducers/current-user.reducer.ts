import { ActionReducer, Action } from '@ngrx/store';

import {
  User, SET_CURRENT_USER
} from './../constants';

export const currentUserReducer: ActionReducer<User> = (state: User, action: Action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      let currentUser = new User(action.payload);
      return Object.assign({}, state, currentUser);
    default:
      return state;
  }
}
