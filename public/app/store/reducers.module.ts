import {
  articleListReducer,
  pollListReducer,
  currentArticleReducer,
  currentUserReducer,
  currentPollReducer,
  latestPollReducer,
  onlineUsersReducer,
} from './reducers/index';

export const StoreReducers = {
  articleList: articleListReducer,
  pollList: pollListReducer,
  currentArticle: currentArticleReducer,
  currentUser: currentUserReducer,
  currentPoll: currentPollReducer,
  latestPoll: latestPollReducer,
  onlineUsers: onlineUsersReducer,
}
