import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppStore } from './../../app.store';
import { PollAnswer } from './../../objects/index';

@Injectable()
export class PollAnswerService {
  constructor(
    private http: Http,
    private store: AppStore
  ) {}

  vote(type: string, poll_id: number, poll_question_id: number = null): void {
    this.http.post('api/poll', this.voteParams(poll_id, poll_question_id))
      .map(response => response.json())
      .subscribe((res) => {
        let currentPoll = this.store.getKeyValue(type);
        currentPoll.answered = res.data as PollAnswer;
        this.store.setKeyValue(type, currentPoll);
      });
  }

  private voteParams(poll_id: number, poll_question_id: number = null): any {
    return {
      poll_id: poll_id,
      answer: {
        poll_question_id: poll_question_id
      }
    };
  }
}
