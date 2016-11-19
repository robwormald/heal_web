import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { AppState, SET_CURRENT_USER, SET_CURRENT_VIEWUSER, SET_USER_LIST } from './../../store/constants';

@Injectable()
export class UserService {
  constructor(
    private store: Store<AppState>,
    private http: Http
  ) {}

  getUsers(page: number): void {
    this.http.get(`api/user/list/${page}`)
      .map((res) => res.json())
      .subscribe((res) =>
        this.store.dispatch({ type: SET_USER_LIST, payload: res })
      );
  }

  getUser(id: number): void {
    this.http.get(`api/user/view/${id}`)
      .map((res) => res.json())
      .subscribe((res) =>
        this.store.dispatch({ type: SET_CURRENT_VIEWUSER, payload: res.user })
      );
  }

  updateUser(tab: string, data: any): void {
    this.http.patch(`api/user/update/${tab}`, this.prepareParams(tab, data))
      .map(res => res.json())
      .subscribe(res => {
        this.store.dispatch({ type: SET_CURRENT_VIEWUSER, payload: res.user });
        this.store.dispatch({ type: SET_CURRENT_USER, payload: res.user });
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
