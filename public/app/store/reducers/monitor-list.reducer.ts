import { ActionReducer, Action } from '@ngrx/store';

import {
  ServerMonitor, MONITOR_LIST
} from './../constants';

export const monitorListReducer: ActionReducer<ServerMonitor[]> = (state: ServerMonitor[] = [], action: Action) => {
  switch(action.type) {
    case MONITOR_LIST:
      return action.payload;
    default:
      return state;
  }
}
