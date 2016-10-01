import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Poll } from './../objects/poll';
import { PollQuestion } from './../objects/poll-question';
import { PollAnswer } from './../objects/poll-answer';

import { WebsocketService } from './../global/websocket.service';

@Component({
  selector: 'poll-component',
  templateUrl: 'app/poll/poll.component.html',
  providers: [WebsocketService]
})

export class PollComponent {
  poll: Poll;
  questions: PollQuestion[];
  answered: PollAnswer;
  selectedQuestion: number;
  channel: string = 'home';

  constructor(
    private websocket: WebsocketService,
    private sanitizer: DomSanitizer,
  ) {
    let subscription = this.websocket.init(this.channel).subscribe(this.received.bind(this));
    this.websocket.setSubscription(this.channel, subscription);
  }

  private received(res): void {
    switch(res.event) {
      case 'connected':
        this.websocket.perform(this.channel, 'latest_poll');
        break;
      case 'latest_poll':
        this.poll = res.data.poll as Poll;
        this.questions = res.data.questions as PollQuestion[];
        this.answered = res.data.answered as PollAnswer;
        this.calculateWidth();
        break;
    }
  }

  private calculateWidth(): void {
    let total = 0;
    this.questions.map((question) => total+=question.answer_count);
    this.questions.map((question) => {
      question.percent = total ? (question.answer_count/total)*100 : 0;
      question.widthStyle = this.sanitizer.bypassSecurityTrustStyle(`width: ${question.percent}%`);
    });
  }
}
