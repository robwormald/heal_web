import { ActionReducer, Action } from '@ngrx/store';

import {
  ChatMessage, CHAT_MESSAGES_NEW, CHAT_MESSAGES_LIST
} from './../constants';

export const chatMessageListReducer: ActionReducer<ChatMessage[]> = (state: ChatMessage[] = [], action: Action) => {
  switch(action.type) {
    case CHAT_MESSAGES_NEW:
      return [action.payload, ...state];
    case CHAT_MESSAGES_LIST:
      return action.payload;
    default:
      return state;
  }
}
