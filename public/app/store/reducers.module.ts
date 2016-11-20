import {
  articleListReducer,
  pollListReducer,
  userListReducer,
  commentListReducer,
  monitorListReducer,

  currentArticleReducer,
  currentUserReducer,
  currentViewUserReducer,
  currentPollReducer,
  currentCommentReducer,

  latestPollReducer,
  onlineUsersReducer,
} from './reducers/index';

export const StoreReducers = {
  articleList: articleListReducer,
  pollList: pollListReducer,
  userList: userListReducer,
  commentList: commentListReducer,
  monitorList: monitorListReducer,

  currentArticle: currentArticleReducer,
  currentUser: currentUserReducer,
  currentViewUser: currentViewUserReducer,
  currentPoll: currentPollReducer,
  currentComment: currentCommentReducer,

  latestPoll: latestPollReducer,
  onlineUsers: onlineUsersReducer,
}
