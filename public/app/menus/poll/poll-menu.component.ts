import { Component } from '@angular/core';

import { PollService } from './../../shared/services/poll.service';
import { WebsocketService } from './../../global/index';
import { Poll, PollQuestion, PollAnswer } from './../../objects/index';

@Component({
  moduleId: module.id,
  selector: 'poll-menu',
  templateUrl: 'poll-menu.component.html',
  providers: [PollService, WebsocketService]
})

export class PollMenuComponent {
  poll: Poll;
  questions: PollQuestion[];
  answered: PollAnswer;
  totalAnswers: number = 0;
  channel: string = 'home';

  constructor(
    private websocket: WebsocketService,
    private pollService: PollService,
  ) {
    this.websocket.init(this.channel).subscribe(this.received.bind(this));
  }

  vote(questionId: number): void {
    this.pollService.vote(this.poll.id, questionId).subscribe((res) => {
      this.answered = res.data as PollAnswer;
    });
  }

  private received(res): void {
    switch(res.event) {
      case 'connected':
        this.websocket.perform(this.channel, 'latest_poll');
        break;
      case 'answered_poll':
        if(res.data.poll && res.data.poll.id == this.poll.id) {
          this.updatePollInformation(res);
        }
        break;
      case 'latest_poll':
        this.updatePollInformation(res)
        break;
    }
  }

  private updatePollInformation(res): void {
    this.poll = res.data.poll as Poll;
    this.questions = res.data.questions as PollQuestion[];
    this.answered = (res.data.answered || this.answered) as PollAnswer;
    this.pollService.calculateWidth(this);
  }
}
