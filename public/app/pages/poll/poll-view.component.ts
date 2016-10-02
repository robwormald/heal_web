import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PollService } from './../../shared/services/poll.service';
import { WebsocketService } from './../../global/index';
import { Poll, PollQuestion, PollAnswer } from './../../objects/index';

@Component({
  moduleId: module.id,
  selector: 'poll-view-component',
  templateUrl: './poll-view.component.html',
  providers: [PollService, WebsocketService]
})

export class PollViewPageComponent {
  poll: Poll;
  questions: PollQuestion[];
  answered: PollAnswer;
  totalAnswers: number = 0;
  currentPollId: number;
  channel: string = 'home';

  constructor(
    private websocket: WebsocketService,
    private pollService: PollService,
    private route: ActivatedRoute
  ) {
    this.websocket.init(this.channel).subscribe(this.received.bind(this));
    this.route.params.subscribe((params: Params) => {
      this.currentPollId = +params['id'];

      if(this.websocket.isConnected(this.channel)) {
        this.getPollData();
      }
    });
  }

  vote(questionId: number): void {
    this.pollService.vote(this.poll.id, questionId).subscribe((res) => {
      this.answered = res.data as PollAnswer;
    });
  }

  private received(res): void {
    switch(res.event) {
      case 'connected':
        this.getPollData();
        break;
      case 'answered_poll':
        if(res.data.poll && res.data.poll.id == this.poll.id) {
          this.updatePollInformation(res);
        }
        break;
      case 'current_poll':
        this.updatePollInformation(res);
        break;
    }
  }

  private getPollData(): void {
    this.poll = null;
    this.questions = null;
    this.answered = null;
    this.websocket.perform(this.channel, 'current_poll', { poll_id: this.currentPollId });
  }

  private updatePollInformation(res): void {
    this.poll = res.data.poll as Poll;
    this.questions = res.data.questions as PollQuestion[];
    this.answered = (res.data.answered || this.answered) as PollAnswer;
    this.pollService.calculateWidth(this);
  }
}
