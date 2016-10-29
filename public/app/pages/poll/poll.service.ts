import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { AppStore } from './../../app.store';
import { WebsocketService } from './../../global/index';

import { Poll, PollQuestion, PollAnswer, PollView, PollList } from './../../objects/index';

@Injectable()
export class PollService {
  connected: boolean = false;
  channel: string = 'poll';

  constructor(
    private websocket: WebsocketService,
    private sanitizer: DomSanitizer,
    private store: AppStore,
  ) {}

  subscribe(type: string, params: any): void {
    this.websocket.init(this.channel).subscribe(this.receive.bind(this, type, params));
    if(type == 'view') {
      this.websocket.init('home').subscribe(this.recieveHome.bind(this));
    }
  }

  perform(type: string, params: any): void {
    if(this.websocket.isConnected(this.channel)) {
      this.websocket.perform(this.channel, this.action(type), params);
    }
    else {
      this.subscribe(type, params);
    }
  }

  private action(type: string): string {
    switch(type) {
      case 'list':
        return 'poll_list';
      case 'view':
        return 'current_poll';
    }
  }

  private recieveHome(res: any): void {
    switch(res.event) {
      case 'answered_poll':
        if(res.data.poll.id == this.store.getKeyValue('currentPoll').poll.id) {
          this.updatePollInformation(res.data);
        }
        break;
    }
  }

  private receive(type: string, params: any, res: any): void {
    switch(res.event) {
      case 'connected':
        if(!this.connected) {
          this.connected = true;
          this.perform(type, params);
        }
        break;
      case 'poll_list':
        let pollData = {
          polls: res.data.polls as Poll[],
          totalCount: res.data.total_count,
          currentPage: res.data.current_page as number,
        } as PollList;

        this.store.setKeyValue('pollList', pollData);
        break;
      case 'current_poll':
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
      this.store.setKeyValue('currentPoll', pollData);
    }
    else {
      // TODO make redirect to notfound
      // this.router.navigate(['/']);
      this.store.setKeyValue('currentPoll', { redirect: true });
    }
  }

  private calculateWidth(data: PollView): void {
    data.totalAnswers = 0;
    data.questions.map((question) => data.totalAnswers += question.answer_count);
    data.questions.map((question) => {
      question.percent = data.totalAnswers ? (question.answer_count/data.totalAnswers)*100 : 0;
      if(question.percent) {
        question.percent = question.percent.toFixed(2);
      }
      question.widthStyle = this.sanitizer.bypassSecurityTrustStyle(`width: ${question.percent}%`);
    });
  }

  private getAnswered(answered: PollAnswer): any {
    let user_id = this.store.getKeyValue('currentUser').id;
    return answered && answered.user_id == user_id ? answered : this.store.getKeyValue('currentPoll').answered;
  }
}
