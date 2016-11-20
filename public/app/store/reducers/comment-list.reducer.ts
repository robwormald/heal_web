import { ActionReducer, Action } from '@ngrx/store';

import {
  Comment, COMMENT_LIST, COMMENT_CREATE, COMMENT_DELETE, COMMENT_UPDATE
} from './../constants';

export const commentListReducer: ActionReducer<Comment[]> = (state: Comment[] = [], action: Action) => {
  switch(action.type) {
    case COMMENT_LIST:
    case COMMENT_CREATE:
    case COMMENT_DELETE:
    case COMMENT_UPDATE:
      return action.payload;
    default:
      return state;
  }
}
