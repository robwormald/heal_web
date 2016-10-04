import { Component } from '@angular/core';

import { AppStore } from './../../app.store';
import { PollAnswerService } from './../../shared/services/poll-answer.service';
import { WebsocketService } from './../../global/index';
import { Poll, PollQuestion, PollAnswer } from './../../objects/index';

@Component({
  moduleId: module.id,
  selector: 'poll-menu',
  templateUrl: 'poll-menu.component.html',
  providers: [PollAnswerService, WebsocketService]
})

export class PollMenuComponent {
  poll: Poll;
  questions: PollQuestion[];
  answered: PollAnswer;
  totalAnswers: number = 0;
  message: string;
  channel: string = 'home';

  constructor(
    private websocket: WebsocketService,
    private answerService: PollAnswerService,
    private store: AppStore,
  ) {
    this.websocket.init(this.channel).subscribe(this.received.bind(this));
  }

  vote(questionId: number): void {
    this.answerService.vote('latestPoll', this.poll.id, questionId);
  }

  private received(res): void {
    switch(res.event) {
      case 'connected':
        this.websocket.perform(this.channel, 'latest_poll');
        break;
      case 'answered_poll':
        if(res.data.poll && res.data.poll.id == this.poll.id) {
          this.updatePollInformation(res.data, true);
        }
        break;
      case 'latest_poll':
        this.updatePollInformation(res.data)
        break;
    }
  }

  private updatePollInformation(data: any, update: boolean = false): void {
    if(data.poll) {
      this.message = null;
      this.poll = data.poll as Poll;
      this.questions = data.questions as PollQuestion[];

      if(update && data.answered && data.answered.user_id == this.store.getKeyValue('currentUser').id || data.answered) {
        this.answered = data.answered as PollAnswer;
      }
      // this.answerService.calculateWidth(this);
    }
    else {
      this.message = 'No polls yet :(';
    }
  }
}
