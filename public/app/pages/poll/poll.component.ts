import { Component } from '@angular/core';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { Store } from '@ngrx/store';

import { PollRenderService } from './../../shared/services/poll-render.service';
import { AppState, PollView } from './../../store/constants';

@Component({
  moduleId: module.id,
  templateUrl: './poll.component.html',
  providers: [PollRenderService],
})

export class PollComponent {
  currentPoll: PollView;

  constructor(
    private breadcrumb: BreadcrumbService,
    private store: Store<AppState>,
  ) {
    this.breadcrumb.hideRoute('/polls/view');
    this.breadcrumb.hideRoute('/polls/list');
    this.breadcrumb.hideRouteRegex('^/polls/list/[0-9]');
    this.breadcrumb.addFriendlyNameForRoute('/polls', 'Polls');
    this.breadcrumb.addCallbackForRouteRegex('^/polls/view/[0-9]$', this.setPollTitle.bind(this));
    this.store.select('currentPoll').subscribe((currentPoll: PollView) => this.currentPoll = currentPoll);
  }

  private setPollTitle(): string {
    let poll = this.currentPoll.poll;
    return poll && poll.title || ' ';
  }
}
