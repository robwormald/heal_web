import { ActionReducer, Action } from '@ngrx/store';

import {
  Article, SET_CURRENT_ARTICLE
} from './../constants';

export function currentArticleReducer(state: Article = {} as Article, action: Action): Article {
  switch(action.type) {
    case SET_CURRENT_ARTICLE:
      return action.payload;
    default:
      return state;
  }
}
