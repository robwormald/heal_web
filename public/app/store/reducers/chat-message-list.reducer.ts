import { ActionReducer, Action } from '@ngrx/store';

import {
  ChatMessage, CHAT_MESSAGES_NEW, CHAT_MESSAGES_LIST
} from './../constants';

export function chatMessageListReducer(state: ChatMessage[] = [], action: Action): ChatMessage[] {
  switch(action.type) {
    case CHAT_MESSAGES_NEW:
      return [action.payload, ...state];
    case CHAT_MESSAGES_LIST:
      return action.payload;
    default:
      return state;
  }
}
