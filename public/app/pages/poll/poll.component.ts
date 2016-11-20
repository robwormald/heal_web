import { Component } from '@angular/core';
import { Store     } from '@ngrx/store';

import { TranslateService   } from 'ng2-translate';
import { BreadcrumbService  } from 'ng2-breadcrumb/ng2-breadcrumb';
import { PollRenderService  } from './../../shared/services/poll-render.service';
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
    private translate: TranslateService,
  ) {
    this.breadcrumb.hideRoute('/polls/view');
    this.breadcrumb.hideRoute('/polls/list');
    this.breadcrumb.hideRouteRegex('^/polls/list/[0-9]');
    this.translate.get('pages.poll.title').subscribe((res: string) => {
      this.breadcrumb.addFriendlyNameForRoute('/polls', res);
    });
    this.breadcrumb.addCallbackForRouteRegex('^/polls/view/[0-9]$', this.setPollTitle.bind(this));
    this.store.select('currentPoll').subscribe((currentPoll: PollView) => this.currentPoll = currentPoll);
  }

  private setPollTitle(): string {
    let poll = this.currentPoll.poll;
    return poll && poll.title || ' ';
  }
}
