import { NgModule } from '@angular/core';

import { PollMenuComponent } from './poll/poll-menu.component';
import { OnlineMenuComponent } from './online/online-menu.component';
import { UserMenuComponent } from './user/user-menu.component';

@NgModule({
  declarations: [
    PollMenuComponent,
    OnlineMenuComponent,
    UserMenuComponent,
  ],
})

export class MenuModule {}
