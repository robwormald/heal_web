import { User, UserList, PollView, PollList, ServerMonitor } from './../objects/index';
export { User, UserList, PollView, PollList, ServerMonitor }

export interface AppState {
  onlineUsers: User[];
  currentUser: User;
  currentViewUser: User;
  userList: UserList;
  currentPoll: PollView;
  latestPoll: PollView;
  pollList: PollList;
  serverMonitors: ServerMonitor[];
};

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_ONLINE_USERS = 'SET_ONLINE_USERS';
export const ADD_ONLINE_USER = 'ADD_ONLINE_USER';
export const REMOVE_ONLINE_USER = 'REMOVE_ONLINE_USER';
export const UPDATE_ONLINE_USER = 'UPDATE_ONLINE_USER';
