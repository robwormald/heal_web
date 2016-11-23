import { Component  } from '@angular/core';
import { Store      } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  AppState, Notification, NOTIFICATIONS_REMOVE
} from './../../store/constants';

@Component({
  moduleId: module.id,
  selector: 'notification-block',
  templateUrl: 'notification.component.html',
})

export class NotificationComponent  {
  notifications: Observable<Notification[]>;

  constructor(
    private store: Store<AppState>
  ) {
    this.notifications = this.store.select('notifications');
  }

  mobileClick(notification) {
    if(!window['mobilecheck']()) return;
    this.closeNotification(notification);
  }

  closeNotification(notification): void {
    this.store.dispatch({ type: NOTIFICATIONS_REMOVE, payload: notification });
  }
}
