import { Component, OnInit } from '@angular/core';
import { Observable        } from 'rxjs/Observable';
import { Store             } from '@ngrx/store';

import { AppState, Preferences, UserPreference } from './../../store/constants';
import { PreferenceChangerService } from './preference-changer.service';

@Component({
  moduleId: module.id,
  selector: 'preference-changer',
  templateUrl: './preference-changer.component.html',
  providers: [PreferenceChangerService]
})

export class PreferenceChangerComponent implements OnInit {
  preferences: Observable<Preferences>;
  currentPreference: Observable<UserPreference>;

  constructor(
    private service: PreferenceChangerService,
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
