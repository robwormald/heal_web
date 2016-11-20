import { ActionReducer, Action } from '@ngrx/store';

import {
  Preferences, PREFERENCES_SET, PREFERENCES_UPDATE
} from './../constants';

export const preferencesReducer: ActionReducer<Preferences> = (state: Preferences = {} as Preferences, action: Action) => {
  switch(action.type) {
    case PREFERENCES_SET:
    case PREFERENCES_UPDATE:
      return action.payload;
    default:
      return state;
  }
}
