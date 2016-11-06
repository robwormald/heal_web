import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';

import { AppStore } from './../../app.store';
import { WebsocketService } from './../../global/index';
import { PollService } from './poll.service';

@Component({
  moduleId: module.id,
  templateUrl: './poll.component.html',
  providers: [WebsocketService, PollService]
})

export class PollComponent implements OnDestroy {
  constructor(
    private service: PollService,
    private breadcrumb: BreadcrumbService,
    private store: AppStore,
  ) {
    this.breadcrumb.hideRoute('/polls/view');
    this.breadcrumb.hideRoute('/polls/list');
    this.breadcrumb.hideRouteRegex('^/polls/list/[0-9]');
    this.breadcrumb.addFriendlyNameForRoute('/polls', 'Polls');
    this.breadcrumb.addCallbackForRouteRegex('^/polls/view/[0-9]$', this.setPollTitle.bind(this));
  }

  ngOnDestroy(): void {
    this.service.unsubscribe();
  }

  private setPollTitle(): string {
    let poll = this.store.getKeyValue('currentPoll').poll;
    return poll ? poll.title : ' ';
  }
}
