import { Component, OnInit } from '@angular/core';
import { Store             } from '@ngrx/store';
import { Observable        } from 'rxjs/Observable';

import { PreferencesService } from './preferences.service';
import { AppState, Preferences, UserPreference } from './../../store/constants';

@Component({
  moduleId: module.id,
  selector: 'preferences',
  templateUrl: './preferences.component.html',
  providers: [PreferencesService]
})

export class PreferencesComponent implements OnInit {
  preferences: Observable<Preferences>;
  currentPreference: Observable<UserPreference>;

  constructor(
    private service: PreferencesService,
    private store: Store<AppState>,
  ) {
    this.preferences = this.store.select('preferences');
    this.currentPreference = this.store.select('currentPreference');
  }

  ngOnInit(): void {
    this.service.get();
  }

  changeColor(color: string): void {
    this.service.change({ color });
  }

  changeLanguage(language: string): void {
    this.service.change({ language });
  }

  changeBrightness(brightness: string): void {
    this.service.change({ brightness });
  }
}
