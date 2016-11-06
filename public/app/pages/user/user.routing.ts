import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent     } from './user.component';
import { UserListComponent } from './user-list.component';
import { UserViewComponent } from './user-view.component';

const routes: Routes = [{
  path: 'users',
  component: UserComponent,
  children: [{
    path: '',
    redirectTo: 'list/1'
  }, {
    path: 'list/:page',
    component: UserListComponent
  }, {
    path: 'view/:id',
    component: UserViewComponent
  }]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
