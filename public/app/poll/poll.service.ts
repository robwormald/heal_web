import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PollService {
  constructor(private http: Http) { }

  vote(poll_id: number, poll_question_id: number = null): Observable<any> {
    return this.http.post('api/poll', this.voteParams(poll_id, poll_question_id))
      .map(response => response.json());
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
