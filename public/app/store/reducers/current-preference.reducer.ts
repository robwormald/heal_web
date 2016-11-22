import { ActionReducer, Action } from '@ngrx/store';

import {
  UserPreference, CURRENT_PREFERENCE_SET, CURRENT_PREFERENCE_UPDATE
} from './../constants';

export function currentPreferenceReducer(state: UserPreference = {} as UserPreference, action: Action): UserPreference {
  switch(action.type) {
    case CURRENT_PREFERENCE_SET:
    case CURRENT_PREFERENCE_UPDATE:
      return action.payload;
    default:
      return state;
  }
}
