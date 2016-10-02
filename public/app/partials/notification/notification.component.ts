import { Component, OnInit, OnDestroy } from '@angular/core';

import { Notification } from './../../objects/index';
import { WebsocketService } from './../../global/index';

@Component({
  moduleId: module.id,
  selector: 'notification-block',
  templateUrl: 'notification.component.html',
  providers: [WebsocketService]
})

export class NotificationPartialComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  channel: string = 'home';

  notificationDesign: any = {
    danger:  { position: 'ribbon-left', mark: 'fa fa-exclamation' },
    warning: { position: 'ribbon-left', mark: 'fa fa-exclamation-triangle' },
    success: { position: 'ribbon-left', mark: 'fa fa-check' },
    info:    { position: 'ribbon-left', mark: '' },
  };

  constructor(private websocket: WebsocketService) {}

  ngOnInit(): void {
    let subscription = this.websocket.init(this.channel).subscribe(this.received.bind(this));
    this.websocket.setSubscription(this.channel, subscription);
  }

  ngOnDestroy(): void {
    this.websocket.destroy(this.channel);
  }

  mobileClick(notification) {
    if(window['mobilecheck']()) {
      this.closeNotification(notification);
    }
  }

  closeNotification(notification): void {
    let index = this.notifications.indexOf(notification);
    if(index > -1) {
      this.notifications.splice(index, 1);
    }
  }

  private received(res: any): void {
    if(res.event == 'notification') {
      let notification = res.data as Notification;
      Object.assign(notification, this.notificationDesign[notification.type]);
      this.notifications.unshift(notification);
    }
  }
}
