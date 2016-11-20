import { ActionReducer, Action } from '@ngrx/store';

import {
  User, SET_CURRENT_VIEWUSER
} from './../constants';

export const currentViewUserReducer: ActionReducer<User> = (state: User, action: Action) => {
  switch(action.type) {
    case SET_CURRENT_VIEWUSER:
      return new User(action.payload);
    default:
      return state;
  }
}
