import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';

import { StateService } from './../global/state.service';
import { User } from './../objects';

@Component({
  selector: 'online-users',
  templateUrl: 'app/appearance/appearance.component.html',
  providers: [StateService]
})

export class AppearanceComponent implements OnInit {
  users: User[] = [];

  constructor(private state: StateService, router: Router) {
    router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        // window['App'].appearance.perform('location', { location: event.url });
      }
    });
  }

  ngOnInit(): void {
    // this.subscribe();
  }

  private subscribe(): void {
    if(!window['App'].appearance) {
      window['App'].appearance = window['App'].cable.subscriptions.create({ channel: 'AppearanceChannel' }, {
        connected:() => {
          window['App'].appearance.perform('user_list');
        },
        received:(data) => {
          switch (data.type) {
            case 'join':
              var index = this.findUserIndex(data.user.id);
              if(index) {
                this.updateUsers(index, data);
              }
              else {
                this.users.push(data.user as User);
              }
              break;
            case 'leave':
              this.users.splice(this.findUserIndex(data.user.id), 1);
              break;
            case 'list':
              this.state.set('currentUser', data.current_user);
              this.users = [...this.users, ...data.users];
              break;
            case 'update':
              var index = this.findUserIndex(data.user.id);
              this.updateUsers(index, data);
              break;
            default:

          }
        }
      });
    }
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

  private unsubscribe(): void {
    window['App'].cable.subscriptions.remove(window['App'].appearance);
    delete window['App'].appearance;
  }
}
