import { ActionReducer, Action } from '@ngrx/store';

import {
  User, UserList, SET_USER_LIST
} from './../constants';

export function userListReducer(state: UserList = {} as UserList, action: Action): UserList {
  switch(action.type) {
    case SET_USER_LIST:
      return Object.assign({}, state, prepareData(action.payload));
    default:
      return state;
  }
}

function prepareData(data: any) {
  return {
    users: data.users.map((user) => new User(user)),
    totalCount: data.count,
    currentPage: data.page,
    perPage: data.per,
  };
}
