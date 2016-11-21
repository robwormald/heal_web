import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPageComponent } from './pages/chat/chat.component';

const appRoutes: Routes = [
  {
    path: 'chat',
    component: ChatPageComponent,
    data: { title: 'Chat' }
  },
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
