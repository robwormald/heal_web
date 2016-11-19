import { ActionReducer, Action } from '@ngrx/store';

import {
  User, SET_ONLINE_USERS, ADD_ONLINE_USER, REMOVE_ONLINE_USER, UPDATE_ONLINE_USER
} from './../constants';

export const onlineUsersReducer: ActionReducer<User[]> = (state: User[] = [], action: Action) => {
  switch(action.type) {
    case SET_ONLINE_USERS:
      let onlineUsers = action.payload.map((user) => new User(user));
      return onlineUsers;
    case ADD_ONLINE_USER:
      return [...state, new User(action.payload)];
    case REMOVE_ONLINE_USER:
      return state.filter((user) => user.id !== action.payload.id);
    case UPDATE_ONLINE_USER:
      return state.map((user) => updateUser(user, action.payload));
    default:
      return state;
  }
}

function updateUser(user: User, payload: User): User {
  if(user.id === payload.id) {
    return new User(payload);
  }

  return user;
}
