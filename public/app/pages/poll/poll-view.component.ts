import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppStore } from './../../app.store';
import { PollService } from './poll.service';
import { PollAnswerService } from './../../shared/services/poll-answer.service';

@Component({
  moduleId: module.id,
  selector: 'poll-view-component',
  templateUrl: './poll-view.component.html',
  providers: [PollService, PollAnswerService]
})

export class PollViewComponent {
  currentPoll: any = {};

  constructor(
    private answerService: PollAnswerService,
    private pollService: PollService,
    private store: AppStore,
    private route: ActivatedRoute
  ) {
    this.store.changes.pluck('currentPoll').subscribe((currentPoll) => this.currentPoll = currentPoll);

    this.route.params.subscribe((params: Params) => {
      if(this.pollService.isConnected('poll')) {
        this.pollService.getPoll(params['id']);
      }
      else {
        this.pollService.subscribePoll(params['id']);
      }
    });
  }

  vote(questionId: number): void {
    this.answerService.vote('currentPoll', this.currentPoll.poll.id, questionId);
  }
}
