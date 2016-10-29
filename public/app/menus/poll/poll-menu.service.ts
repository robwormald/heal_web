import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AppStore } from './../../app.store';
import { WebsocketService } from './../../global/index';

import { Poll, PollQuestion, PollAnswer, PollView } from './../../objects/index';

@Injectable()
export class PollMenuService {
  connected: boolean = false;
  channel: string = 'home';

  constructor(
    private websocket: WebsocketService,
    private sanitizer: DomSanitizer,
    private store: AppStore,
  ) {}

  subscribe(): void {
    this.websocket.init(this.channel).subscribe(this.receive.bind(this));
  }

  private receive(res: any): any {
    switch(res.event) {
      case 'connected':
        if(!this.connected) {
          this.connected = true;
          this.websocket.perform(this.channel, 'latest_poll');
        }
        break;
      case 'answered_poll':
        if(res.data.poll.id == this.store.getKeyValue('latestPoll').poll.id) {
          this.updatePollInformation(res.data);
        }
        break;
      case 'latest_poll':
        this.updatePollInformation(res.data);
        break;
    }
  }

  private updatePollInformation(data): void {
    if(data.poll) {
      let pollData = {
        poll: data.poll as Poll,
        questions: data.questions as PollQuestion[],
        answered: this.getAnswered(data.answered)
      } as PollView;

      this.calculateWidth(pollData);
      this.store.setKeyValue('latestPoll', pollData);
    }
    else {
      this.store.setKeyValue('latestPoll', { message: 'No polls found :(' });
    }
  }

  private calculateWidth(data: PollView): void {
    data.totalAnswers = 0;
    data.questions.map((question) => data.totalAnswers += question.answer_count);
    data.questions.map((question) => {
      question.percent = data.totalAnswers ? (question.answer_count/data.totalAnswers)*100 : 0;
      if(question.percent) {
        question.percent = parseFloat(question.percent.toFixed(2))
      }
      question.widthStyle = this.sanitizer.bypassSecurityTrustStyle(`width: ${question.percent}%`);
    });
  }

  private getAnswered(answered: PollAnswer): any {
    let user_id = this.store.getKeyValue('currentUser').id;
    return answered && answered.user_id == user_id ? answered : this.store.getKeyValue('latestPoll').answered;
  }
}
