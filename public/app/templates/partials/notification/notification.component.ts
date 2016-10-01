import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notification } from './../../../objects/notification';
import { WebsocketService } from './../../../global/websocket.service';

@Component({
  selector: 'notification-block',
  templateUrl: 'app/templates/partials/notification/notification.component.html',
  providers: [WebsocketService]
})

export class NotificationComponent implements OnInit, OnDestroy {
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
    window['App'][this.channel].subscription = subscription;
  }

  ngOnDestroy(): void {
    this.websocket.destroy(this.channel);
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
      this.notifications.push(notification);
    }
  }
}
