import { ActionReducer, Action } from '@ngrx/store';

import {
  User, SET_CURRENT_USER
} from './../constants';

export function currentUserReducer(state: User, action: Action): User {
  switch(action.type) {
    case SET_CURRENT_USER:
      return new User(action.payload);
    default:
      return state;
  }
}
