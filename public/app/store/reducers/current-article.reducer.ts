import { ActionReducer, Action } from '@ngrx/store';

import {
  Article, SET_CURRENT_ARTICLE
} from './../constants';

export const currentArticleReducer: ActionReducer<Article> = (state: Article = {} as Article, action: Action) => {
  switch(action.type) {
    case SET_CURRENT_ARTICLE:
      return action.payload;
    default:
      return state;
  }
}
