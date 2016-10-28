import { Component, OnInit } from '@angular/core';

import { ThemesPickerService } from './themes-picker.service';

@Component({
  moduleId: module.id,
  selector: 'themes-picker',
  templateUrl: './themes-picker.component.html',
  providers: [ThemesPickerService]
})

export class ThemesPickerComponent implements OnInit {
  brightness: string = '';
  colors: string[] = [];

  constructor(private service: ThemesPickerService) {}

  ngOnInit(): void {
    this.service.getThemes().subscribe((res) => {
      this.colors = res.colors;
      this.brightness = res.brightness;
    });
  }

  changeColor(color: string): void {
    this.service.changeColor(color).subscribe(() => this.reloadPage());
  }

  changeBrightness(brightness: string): void {
    this.service.changeBrightness(brightness).subscribe(() => this.reloadPage());
  }

  private reloadPage(): void {
    location.reload(true);
  }
}
