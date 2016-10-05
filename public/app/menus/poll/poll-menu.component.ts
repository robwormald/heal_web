import { Component } from '@angular/core';

import { AppStore } from './../../app.store';
import { PollMenuService } from './poll-menu.service';
import { PollAnswerService } from './../../shared/services/poll-answer.service';
import { PollView } from './../../objects/index';

@Component({
  moduleId: module.id,
  selector: 'poll-menu',
  templateUrl: 'poll-menu.component.html',
  providers: [PollMenuService, PollAnswerService]
})

export class PollMenuComponent {
  latestPoll: any = {};

  constructor(
    private pollService: PollMenuService,
    private answerService: PollAnswerService,
    private store: AppStore,
  ) {
    this.store.changes.pluck('latestPoll').subscribe((latestPoll: PollView) => this.latestPoll = latestPoll);
    this.pollService.subscribe();
  }

  vote(questionId: number): void {
    this.answerService.vote('latestPoll', this.latestPoll.poll.id, questionId);
  }
}
