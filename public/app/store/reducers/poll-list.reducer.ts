import { ActionReducer, Action } from '@ngrx/store';

import {
  PollList, SET_POLL_LIST
} from './../constants';

export const pollListReducer: ActionReducer<PollList> = (state: PollList = {} as PollList, action: Action) => {
  switch(action.type) {
    case SET_POLL_LIST:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
