import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { PollService } from './poll.service';
import { PollAnswerService } from './../../shared/services/poll-answer.service';
import { AppState, PollView } from './../../store/constants';

@Component({
  moduleId: module.id,
  selector: 'poll-view-component',
  templateUrl: './poll-view.component.html',
  providers: [PollService, PollAnswerService]
})

export class PollViewComponent {
  currentPoll: PollView;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private service: PollService,
    private answerService: PollAnswerService,
  ) {
    this.store.select('currentPoll').subscribe((currentPoll: PollView) => this.currentPoll = currentPoll);

    this.route.params.subscribe((params: Params) => {
      this.service.getPoll(params['id']);
    });
  }

  vote(questionId: number): void {
    this.answerService.vote('currentPoll', this.currentPoll.poll.id, questionId);
  }
}
