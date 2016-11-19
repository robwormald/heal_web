import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { PollMenuService } from './poll-menu.service';
import { PollAnswerService } from './../../shared/services/poll-answer.service';
import { AppState, PollView } from './../../store/constants';
import { WebsocketService } from './../../global/index';

@Component({
  moduleId: module.id,
  selector: 'poll-menu',
  templateUrl: 'poll-menu.component.html',
  providers: [PollMenuService, PollAnswerService, WebsocketService]
})

export class PollMenuComponent {
  latestPoll: PollView;

  constructor(
    private pollService: PollMenuService,
    private answerService: PollAnswerService,
    private store: Store<AppState>,
  ) {
    this.store.select('latestPoll').subscribe((latestPoll: PollView) => this.latestPoll = latestPoll);
    this.pollService.subscribe();
  }

  vote(questionId: number): void {
    this.answerService.vote('latestPoll', this.latestPoll.poll.id, questionId);
  }
}
