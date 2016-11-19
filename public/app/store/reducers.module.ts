import {
  currentUserReducer,
  onlineUsersReducer,
  latestPollReducer,
} from './reducers/index';

export const StoreReducers = {
  currentUser: currentUserReducer,
  onlineUsers: onlineUsersReducer,
  latestPoll: latestPollReducer,
}
