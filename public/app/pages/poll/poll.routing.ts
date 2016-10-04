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
    redirectTo: 'list/1'
  }, {
    path: 'list/:page',
    component: PollHomeComponent
  }, {
    path: 'view/:id',
    component: PollViewComponent
  }]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
