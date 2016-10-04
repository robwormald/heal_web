import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppStore } from './../../app.store';
import { PollList } from './../../objects/index';
import { PollService } from './poll.service';

@Component({
  moduleId: module.id,
  selector: 'poll-list-component',
  templateUrl: './poll-list.component.html',
  providers: [PollService]
})

export class PollListComponent {
  pollList: any = {};

  constructor(
    private store: AppStore,
    private route: ActivatedRoute,
    private pollService: PollService,
  ) {
    this.store.changes.pluck('pollList').subscribe((pollList: PollList) => this.pollList = pollList);

    this.route.params.subscribe((params: Params) => {
      this.store.setKeyValue('pollList', {});
      this.pollService.perform('list', { page: params['page'] });
    });
  }
}
