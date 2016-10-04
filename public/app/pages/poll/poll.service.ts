import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AppStore } from './../../app.store';
import { WebsocketService } from './../../global/index';

import { Poll, PollQuestion, PollAnswer, PollObject } from './../../objects/index';

@Injectable()
export class PollService {
  connected: boolean = false;

  constructor(
    private websocket: WebsocketService,
    private sanitizer: DomSanitizer,
    private store: AppStore,
  ) {}

  isConnected(name: string): boolean {
    return this.websocket.isConnected(name);
  }

  subscribePoll(pollId: number): void {
    this.websocket.init('poll').subscribe(this.receivePoll.bind(this, pollId));
  }

  getPoll(pollId: number): void {
    this.websocket.perform('poll', 'current_poll', { poll_id: pollId });
  }

  private receivePoll(pollId: number, res: any): void {
    switch(res.event) {
      case 'connected':
        if(!this.connected) {
          this.connected = true;
          this.getPoll(pollId);
        }
        break;
      case 'current_poll':
      case 'answered_poll':
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
      } as PollObject;

      this.calculateWidth(pollData);
      this.store.setKeyValue('currentPoll', pollData);
    }
    else {
      // TODO make redirect to notfound
      // this.router.navigate(['/']);
      this.store.setKeyValue('currentPoll', { redirect: true });
    }
  }

  private calculateWidth(data: PollObject): void {
    data.totalAnswers = 0;
    data.questions.map((question) => data.totalAnswers += question.answer_count);
    data.questions.map((question) => {
      question.percent = data.totalAnswers ? (question.answer_count/data.totalAnswers)*100 : 0;
      question.widthStyle = this.sanitizer.bypassSecurityTrustStyle(`width: ${question.percent}%`);
    });
  }

  private getAnswered(answered: any): any {
    let user_id = this.store.getKeyValue('currentUser').id;
    return answered && answered.user_id == user_id ? answered as PollAnswer : null;
  }
}
