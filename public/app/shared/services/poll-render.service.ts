import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { AppState, User, PollView } from './../../store/constants';

@Injectable()
export class PollRenderService {
  currentUser: User;
  latestPoll: PollView;
  currentPoll: PollView;

  constructor(
    private store: Store<AppState>,
    private sanitizer: DomSanitizer,
  ) {
    this.store.select('latestPoll').subscribe((latestPoll: PollView) => this.latestPoll = latestPoll);
    this.store.select('currentPoll').subscribe((currentPoll: PollView) => this.currentPoll = currentPoll);
    this.store.select('currentUser').subscribe((currentUser: User) => this.currentUser = currentUser);
  }

  getData(data: any, type: string): any {
    const { poll, questions, answered } = data;
    if(!poll) return { message: 'not_found.polls' };
    return this.calculateWidth({ poll, questions, answered: this.getAnswered(answered, type) });
  }

  private calculateWidth(data: any): any {
    data.totalAnswers = 0;
    data.questions.map((question) => data.totalAnswers += question.answer_count);
    data.questions.map((question) => {
      question.percent = data.totalAnswers ? (question.answer_count/data.totalAnswers) : 0;
      if(question.percent) {
        question.percent = parseFloat(question.percent.toFixed(2))
      }
      question.widthStyle = this.sanitizer.bypassSecurityTrustStyle(`width: ${question.percent * 100}%`);
    });
    return data;
  }

  private getAnswered(answered: any, type: string): any {
    return answered && this.currentUser && answered.user_id == this.currentUser.id ? answered : this[type].answered;
  }
}
