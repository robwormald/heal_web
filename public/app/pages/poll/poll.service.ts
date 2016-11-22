import { Injectable } from '@angular/core';
import { Http       } from '@angular/http';
import { Store      } from '@ngrx/store';

import { PollRenderService } from './../../shared/services/poll-render.service';
import { AppState, SET_POLL_LIST, SET_CURRENT_POLL } from './../../store/constants';

@Injectable()
export class PollService {
  constructor(
    private store: Store<AppState>,
    private http: Http,
    private pollRender: PollRenderService,
  ) {}

  getPolls(page: number): void {
    this.http.get(`api/poll/list/${page}`)
      .map((res) => res.json())
      .subscribe((res) =>
        this.store.dispatch({ type: SET_POLL_LIST, payload: res })
      );
  }

  getPoll(id: number): void {
    this.http.get(`api/poll/view/${id}`)
      .map((res) => res.json())
      .subscribe((res) =>
        this.store.dispatch({ type: SET_CURRENT_POLL, payload: this.pollRender.getData(res, 'currentPoll') })
      );
  }
}
