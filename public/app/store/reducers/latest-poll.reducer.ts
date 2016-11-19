import { ActionReducer, Action } from '@ngrx/store';

import {
  PollView, SET_LATEST_POLL
} from './../constants';

export const latestPollReducer: ActionReducer<PollView> = (state: PollView = {} as PollView, action: Action) => {
  switch(action.type) {
    case SET_LATEST_POLL:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
