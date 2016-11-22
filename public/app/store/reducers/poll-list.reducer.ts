import { ActionReducer, Action } from '@ngrx/store';

import {
  PollList, SET_POLL_LIST
} from './../constants';

export function pollListReducer(state: PollList = {} as PollList, action: Action): PollList {
  switch(action.type) {
    case SET_POLL_LIST:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
