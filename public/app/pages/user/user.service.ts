import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { AppStore } from './../../app.store';

@Injectable()
export class UserService {
  constructor(
    private store: AppStore,
    private http: Http
  ) {}

  getUsers(page: number): void {
    this.http.get(`api/user/list/${page}`)
      .map(res => res.json())
      .subscribe(res => {
        let userList = {
          users: res.users,
          totalCount: res.count,
          currentPage: res.page,
          perPage: res.per,
        };

        this.store.setKeyValue('userList', userList);
      });
  }

  getUser(id: number): void {
    this.http.get(`api/user/view/${id}`)
      .map(res => res.json())
      .subscribe(res => this.store.setKeyValue('currentViewUser', res.user));
  }

  updateUser(tab: string, data: any): void {
    this.http.patch(`api/user/update/${tab}`, this.prepareParams(tab, data))
      .map(res => res.json())
      .subscribe(res => {
        this.store.setKeyValue('currentViewUser', res.user);
        this.store.setKeyValue('currentUser', res.user);
      });
  }

  private prepareParams(tab: string, data: any): any {
    if(tab == 'uploads') {
      let formData = new FormData();
      for(let key in data) {
        formData.append(key, data[key]);
      }
      return formData;
    }

    return { data };
  }
}
