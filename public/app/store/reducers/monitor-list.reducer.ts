import { ActionReducer, Action } from '@ngrx/store';

import {
  ServerMonitor, MONITOR_LIST
} from './../constants';

export function monitorListReducer(state: ServerMonitor[] = [], action: Action): ServerMonitor[] {
  switch(action.type) {
    case MONITOR_LIST:
      return action.payload;
    default:
      return state;
  }
}
