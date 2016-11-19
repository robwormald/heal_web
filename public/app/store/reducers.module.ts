import {
  articleListReducer,
  pollListReducer,
  userListReducer,
  currentArticleReducer,
  currentUserReducer,
  currentViewUserReducer,
  currentPollReducer,
  latestPollReducer,
  onlineUsersReducer,
} from './reducers/index';

export const StoreReducers = {
  articleList: articleListReducer,
  pollList: pollListReducer,
  userList: userListReducer,
  currentArticle: currentArticleReducer,
  currentUser: currentUserReducer,
  currentViewUser: currentViewUserReducer,
  currentPoll: currentPollReducer,
  latestPoll: latestPollReducer,
  onlineUsers: onlineUsersReducer,
}
