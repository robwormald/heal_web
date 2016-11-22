import { ActionReducer, Action } from '@ngrx/store';

import {
  CHAT_ROOMS
} from './../constants';

export function chatRoomListReducer(state: Object = {}, action: Action): Object {
  switch(action.type) {
    case CHAT_ROOMS:
      return action.payload;
    default:
      return state;
  }
}
