import { ActionReducer, Action } from '@ngrx/store';

import {
  Notification, NOTIFICATIONS_ADD, NOTIFICATIONS_REMOVE
} from './../constants';

export function notificationsReducer(state: Notification[] = [], action: Action): Notification {
  switch(action.type) {
    case NOTIFICATIONS_ADD:
      return [...state, extendNotification(action.payload)];
    case NOTIFICATIONS_REMOVE:
      return state.filter((notification) => notification.body !== action.payload.body);
    default:
      return state;
  }
}

function extendNotification(notification: Notification): Notification {
  const design: any = {
    danger:  { position: 'ribbon-left', mark: 'fa fa-exclamation' },
    warning: { position: 'ribbon-left', mark: 'fa fa-exclamation-triangle' },
    success: { position: 'ribbon-left', mark: 'fa fa-check' },
    info:    { position: 'ribbon-left', mark: '' },
  };

  return Object.assign(notification, design[notification.type]);
}
