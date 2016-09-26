import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { ChatComponent }   from './chat/chat.component';

const appRoutes: Routes = [
  { path: 'chat', redirectTo: 'chat/1' },
  {
    path: 'chat/:id',
    component: ChatComponent,
    data: { title: 'Chat' }
  },
  { path: '', component: HomeComponent },
  // { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
