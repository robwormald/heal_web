import { ActionReducer, Action } from '@ngrx/store';

import {
  Preferences, PREFERENCES_SET, PREFERENCES_UPDATE
} from './../constants';

export function preferencesReducer(state: Preferences = {} as Preferences, action: Action): Preferences {
  switch(action.type) {
    case PREFERENCES_SET:
    case PREFERENCES_UPDATE:
      return action.payload;
    default:
      return state;
  }
}
