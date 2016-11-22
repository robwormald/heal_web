import { ActionReducer, Action } from '@ngrx/store';

import {
  ArticleList, SET_ARTICLE_LIST
} from './../constants';

export function articleListReducer(state: ArticleList = {} as ArticleList, action: Action): ArticleList {
  switch(action.type) {
    case SET_ARTICLE_LIST:
      let articleList = {
        articles: action.payload.articles,
        totalCount: action.payload.count,
        currentPage: action.payload.page,
        perPage: action.payload.per,
      };

      return Object.assign({}, state, articleList);
    default:
      return state;
  }
}
