import { NgModule } from '@angular/core';

import { FooterComponent } from './layout/footer.component';
import { HeaderComponent } from './layout/header.component';
import { NotificationPartialComponent } from './notification/notification.component';
import { PreferencesComponent } from './preferences/preferences.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotificationPartialComponent,
    PreferencesComponent,
  ],
})

export class MainModule {}
