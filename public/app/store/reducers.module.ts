import { articleListReducer } from './reducers/article-list.reducer';
import { pollListReducer    } from './reducers/poll-list.reducer';
import { userListReducer    } from './reducers/user-list.reducer';
import { commentListReducer } from './reducers/comment-list.reducer';
import { monitorListReducer } from './reducers/monitor-list.reducer';

import { currentArticleReducer    } from './reducers/current-article.reducer';
import { currentUserReducer       } from './reducers/current-user.reducer';
import { currentViewUserReducer   } from './reducers/current-view-user.reducer';
import { currentPollReducer       } from './reducers/current-poll.reducer';
import { currentCommentReducer    } from './reducers/current-comment.reducer';
import { currentPreferenceReducer } from './reducers/current-preference.reducer';

import { latestPollReducer    } from './reducers/latest-poll.reducer';
import { onlineUsersReducer   } from './reducers/online-users.reducer';
import { preferencesReducer   } from './reducers/preferences.reducer';
import { notificationsReducer } from './reducers/notifications.reducer';

export const StoreReducers = {
  articleList: articleListReducer,
  pollList:    pollListReducer,
  userList:    userListReducer,
  commentList: commentListReducer,
  monitorList: monitorListReducer,

  currentArticle:    currentArticleReducer,
  currentUser:       currentUserReducer,
  currentViewUser:   currentViewUserReducer,
  currentPoll:       currentPollReducer,
  currentComment:    currentCommentReducer,
  currentPreference: currentPreferenceReducer,

  latestPoll:    latestPollReducer,
  onlineUsers:   onlineUsersReducer,
  preferences:   preferencesReducer,
  notifications: notificationsReducer,
}
