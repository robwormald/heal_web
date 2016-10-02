import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';

import { User } from './../../objects/index';
import { StateService, WebsocketService } from './../../global/index';

@Component({
  moduleId: module.id,
  selector: 'online-users',
  templateUrl: 'appearance.component.html',
  providers: [StateService, WebsocketService]
})

export class AppearancePartialComponent implements OnInit, OnDestroy {
  users: User[] = [];
  channel: string = 'appearance';

  constructor(
    private state: StateService,
    private router: Router,
    private websocket: WebsocketService
  ) {
    router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        this.websocket.perform(this.channel, 'location', { location: event.url });
      }
    });
  }

  ngOnInit(): void {
    this.websocket.init(this.channel).subscribe((res: any) => {
      switch (res.event) {
        case 'join':
          var index = this.findUserIndex(res.data.user.id);
          if(index) {
            this.updateUsers(index, res.data);
          }
          else {
            this.users.push(res.data.user as User);
          }
          break;
        case 'leave':
          this.users.splice(this.findUserIndex(res.data.user.id), 1);
          break;
        case 'list':
          this.state.set('currentUser', res.data.current_user);
          this.users = [...this.users, ...res.data.users];
          break;
        case 'update':
          var index = this.findUserIndex(res.data.user.id);
          this.updateUsers(index, res.data);
          break;
        case 'connected':
          this.websocket.perform(this.channel, 'user_list');
          this.websocket.perform(this.channel, 'sample_notif');
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.websocket.destroy(this.channel);
  }

  private updateUsers(index: number, data: any): void {
    if(data.user.id == this.state.get('currentUser').id) {
      this.state.set('currentUser', data.user);
    }

    return this.users[index] = data.user;
  }

  private findUserIndex(id: number): any {
    for(let i in this.users) {
      if(this.users[i].id as number == id) return i;
    }
  }
}
