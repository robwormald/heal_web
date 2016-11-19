import {
  articleListReducer,
  currentArticleReducer,
  currentUserReducer,
  latestPollReducer,
  onlineUsersReducer,
} from './reducers/index';

export const StoreReducers = {
  articleList: articleListReducer,
  currentArticle: currentArticleReducer,
  currentUser: currentUserReducer,
  latestPoll: latestPollReducer,
  onlineUsers: onlineUsersReducer,
}
