import { ActionReducer, Action } from '@ngrx/store';

import {
  PollView, SET_LATEST_POLL
} from './../constants';

export function latestPollReducer(state: PollView = {} as PollView, action: Action): PollView {
  switch(action.type) {
    case SET_LATEST_POLL:
      return action.payload;
    default:
      return state;
  }
}
