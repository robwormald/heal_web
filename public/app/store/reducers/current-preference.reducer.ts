import { ActionReducer, Action } from '@ngrx/store';

import {
  UserPreference, CURRENT_PREFERENCE_SET, CURRENT_PREFERENCE_UPDATE
} from './../constants';

export const currentPreferenceReducer: ActionReducer<UserPreference> = (state: UserPreference = {} as UserPreference, action: Action) => {
  switch(action.type) {
    case CURRENT_PREFERENCE_SET:
    case CURRENT_PREFERENCE_UPDATE:
      return action.payload;
    default:
      return state;
  }
}
