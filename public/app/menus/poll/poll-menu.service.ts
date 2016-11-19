import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { WebsocketService } from './../../global/index';

import { AppState, PollView, User, SET_LATEST_POLL } from './../../store/constants';

@Injectable()
export class PollMenuService {
  latestPoll: PollView;
  currentUser: User;
  connected: boolean = false;
  channel: string = 'home';

  constructor(
    private websocket: WebsocketService,
    private sanitizer: DomSanitizer,
    private store: Store<PollView>,
  ) {
    this.store.select('latestPoll').subscribe((latestPoll: PollView) => this.latestPoll = latestPoll);
    this.store.select('currentUser').subscribe((currentUser: User) => this.currentUser = currentUser);
  }

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
        if(res.data.poll.id == this.latestPoll.poll.id) {
          this.store.dispatch({ type: SET_LATEST_POLL, payload: this.getData(res.data) });
        }
        break;
      case 'latest_poll':
        this.store.dispatch({ type: SET_LATEST_POLL, payload: this.getData(res.data) });
        break;
    }
  }

  private getData(data: any): any {
    const { poll, questions, answered } = data;
    if(!poll) return { message: 'No polls found :(' };
    return this.calculateWidth({ poll, questions, answered: this.getAnswered(answered) });
  }

  private calculateWidth(data): any {
    data.totalAnswers = 0;
    data.questions.map((question) => data.totalAnswers += question.answer_count);
    data.questions.map((question) => {
      question.percent = data.totalAnswers ? (question.answer_count/data.totalAnswers)*100 : 0;
      if(question.percent) {
        question.percent = parseFloat(question.percent.toFixed(2))
      }
      question.widthStyle = this.sanitizer.bypassSecurityTrustStyle(`width: ${question.percent}%`);
    });
    return data;
  }

  private getAnswered(answered): any {
    return answered && answered.user_id == this.currentUser.id ? answered : this.latestPoll.answered;
  }
}
