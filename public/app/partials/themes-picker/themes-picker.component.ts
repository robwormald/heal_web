import { Component } from '@angular/core';

import { ThemesPickerService } from './themes-picker.service';

@Component({
  moduleId: module.id,
  selector: 'themes-picker',
  templateUrl: './themes-picker.component.html',
  providers: [ThemesPickerService]
})

export class ThemesPickerComponent {
  colors: string[] = ['red', 'green', 'blue'];

  constructor(private service: ThemesPickerService) {}

  changeTheme(color: string): void {
    this.service.changeTheme(color).then(() => {
      location.reload(true);
    });
  }
}
