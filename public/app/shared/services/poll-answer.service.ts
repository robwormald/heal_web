import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PollAnswerService {
  constructor(
    private http: Http,
  ) {}

  vote(type: string, poll_id: number, poll_question_id: number = null): void {
    this.http.post('api/poll', this.voteParams(poll_id, poll_question_id))
      .map((res) => res.json())
      .subscribe();
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
