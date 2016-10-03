import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollComponent     } from './poll.component';
import { PollHomeComponent } from './poll-home.component';
import { PollViewComponent } from './poll-view.component';

const routes: Routes = [{
  path: 'polls',
  component: PollComponent,
  children: [{
    path: '',
    component: PollHomeComponent
  }, {
    path: ':id',
    component: PollViewComponent
  }]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
