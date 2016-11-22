import { ActionReducer, Action } from '@ngrx/store';

import {
  PollView, SET_CURRENT_POLL
} from './../constants';

export function currentPollReducer(state: PollView = {} as PollView, action: Action): PollView {
  switch(action.type) {
    case SET_CURRENT_POLL:
      return action.payload;
    default:
      return state;
  }
}
