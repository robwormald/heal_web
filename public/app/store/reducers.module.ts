import {
  currentUserReducer,
  onlineUsersReducer,
} from './reducers/index';

export const StoreReducers = {
  currentUser: currentUserReducer,
  onlineUsers: onlineUsersReducer,
}
