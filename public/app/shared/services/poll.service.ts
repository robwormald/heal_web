import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class PollService {
  constructor(
    private http: Http,
    private sanitizer: DomSanitizer,
  ) {}

  vote(poll_id: number, poll_question_id: number = null): Observable<any> {
    return this.http.post('api/poll', this.voteParams(poll_id, poll_question_id))
      .map(response => response.json());
  }

  calculateWidth(data: any): void {
    data.totalAnswers = 0;
    data.questions.map((question) => data.totalAnswers += question.answer_count);
    data.questions.map((question) => {
      question.percent = data.totalAnswers ? (question.answer_count/data.totalAnswers)*100 : 0;
      question.widthStyle = this.sanitizer.bypassSecurityTrustStyle(`width: ${question.percent}%`);
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
