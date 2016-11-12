import { NgModule } from '@angular/core';

import { routing           } from './user.routing';
import { SharedModule      } from './../../shared/modules/shared.module';
import { UserComponent     } from './user.component';
import { UserListComponent } from './user-list.component';
import { UserViewComponent } from './user-view.component';
import { UserEditComponent } from './user-edit.component';

@NgModule({
  imports: [
    SharedModule,
    routing
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    UserViewComponent,
    UserEditComponent,
  ],
  exports: [UserComponent],
})

export class UserModule {}
