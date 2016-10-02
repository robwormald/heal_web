import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent, ChatPageComponent, PollListPageComponent, PollViewPageComponent } from './pages/index';

const appRoutes: Routes = [
  {
    path: 'chat',
    component: ChatPageComponent,
    data: { title: 'Chat' }
  },
  { path: 'polls/:id', component: PollViewPageComponent },
  { path: 'polls', component: PollListPageComponent },
  { path: '', component: HomePageComponent },
  // { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
