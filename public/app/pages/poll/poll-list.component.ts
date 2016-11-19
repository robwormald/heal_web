import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState, PollList, SET_CURRENT_POLL } from './../../store/constants';
import { PollService } from './poll.service';

@Component({
  moduleId: module.id,
  selector: 'poll-list-component',
  templateUrl: './poll-list.component.html',
  providers: [PollService]
})

export class PollListComponent {
  pollList: Observable<PollList>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private service: PollService,
  ) {
    this.pollList = this.store.select('pollList');

    this.route.params.subscribe((params: Params) => {
      this.store.dispatch({ type: SET_CURRENT_POLL, payload: {} });
      this.service.getPolls(params['page']);
    });
  }
}
