import { Component } from '@angular/core';
import { Store     } from '@ngrx/store';

import { AppState, PollView } from './../../store/constants';
import { PollAnswerService  } from './../../shared/services/poll-answer.service';

@Component({
  moduleId: module.id,
  selector: 'poll-menu',
  templateUrl: 'poll-menu.component.html',
  providers: [PollAnswerService],
})

export class PollMenuComponent {
  latestPoll: PollView;

  constructor(
    private service: PollAnswerService,
    private store: Store<AppState>,
  ) {
    this.store.select('latestPoll').subscribe((latestPoll: PollView) => this.latestPoll = latestPoll);
  }

  vote(questionId: number): void {
    this.service.vote('latestPoll', this.latestPoll.poll.id, questionId);
  }
}
