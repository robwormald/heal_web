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
  currentPreferenceReducer,

  latestPollReducer,
  onlineUsersReducer,
  preferencesReducer,
  notificationsReducer,
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
  currentPreference: currentPreferenceReducer,

  latestPoll: latestPollReducer,
  onlineUsers: onlineUsersReducer,
  preferences: preferencesReducer,
  notifications: notificationsReducer,
}
