import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent     } from './user.component';
import { UserListComponent } from './user-list.component';
import { UserViewComponent } from './user-view.component';
import { UserEditComponent } from './user-edit.component';

const routes: Routes = [{
  path: 'users',
  component: UserComponent,
  children: [{
    path: '',
    redirectTo: 'list/1'
  }, {
    path: 'list',
    redirectTo: 'list/1'
  }, {
    path: 'list/:page',
    component: UserListComponent
  }, {
    path: 'view/:id',
    component: UserViewComponent
  }, {
    path: 'edit',
    component: UserEditComponent
  }]
}];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
