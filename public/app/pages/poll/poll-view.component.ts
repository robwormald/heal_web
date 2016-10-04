import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppStore } from './../../app.store';
import { PollService } from './poll.service';
import { PollAnswerService } from './../../shared/services/poll-answer.service';
import { PollView } from './../../objects/index';

@Component({
  moduleId: module.id,
  selector: 'poll-view-component',
  templateUrl: './poll-view.component.html',
  providers: [PollService, PollAnswerService]
})

export class PollViewComponent {
  currentPoll: any = {};

  constructor(
    private store: AppStore,
    private route: ActivatedRoute,
    private pollService: PollService,
    private answerService: PollAnswerService,
  ) {
    this.store.changes.pluck('currentPoll').subscribe((currentPoll: PollView) => this.currentPoll = currentPoll);

    this.route.params.subscribe((params: Params) => {
      this.store.setKeyValue('currentPoll', {});
      this.pollService.perform('view', { poll_id: params['id'] });
    });
  }

  vote(questionId: number): void {
    this.answerService.vote('currentPoll', this.currentPoll.poll.id, questionId);
  }
}
