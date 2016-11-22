import { ActionReducer, Action } from '@ngrx/store';

import {
  Comment, COMMENT_CURRENT, COMMENT_EDIT
} from './../constants';

export function currentCommentReducer(state: Comment[] = [], action: Action): Comment[] {
  switch(action.type) {
    case COMMENT_CURRENT:
      const { comments, rateData } = action.payload;

      return comments.map((comment) =>
        Object.assign({}, comment, { rateData: { ratings: rateData.ratings[comment.id], user: rateData.user[comment.id] } })
      );
    case COMMENT_EDIT:
      return state.map((comment) => editComment(comment, action.payload));
    default:
      return state;
  }
}

function editComment(comment: Comment, payload: any): any {
  if(comment.id === payload.comment.id) {
    return Object.assign({}, comment, { editing: payload.editing });
  }

  return Object.assign({}, comment, { editing: false });
}
