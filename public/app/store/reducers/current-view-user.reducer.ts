import { ActionReducer, Action } from '@ngrx/store';

import {
  User, SET_CURRENT_VIEWUSER
} from './../constants';

export function currentViewUserReducer(state: User, action: Action): User {
  switch(action.type) {
    case SET_CURRENT_VIEWUSER:
      return new User(action.payload);
    default:
      return state;
  }
}
