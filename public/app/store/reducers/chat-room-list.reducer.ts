import { ActionReducer, Action } from '@ngrx/store';

import {
  CHAT_ROOMS
} from './../constants';

export const chatRoomListReducer: ActionReducer<Object> = (state: Object = {}, action: Action) => {
  switch(action.type) {
    case CHAT_ROOMS:
      return action.payload;
    default:
      return state;
  }
}
