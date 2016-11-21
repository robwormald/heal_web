import { Injectable } from '@angular/core';
import { Store      } from '@ngrx/store';
import { Http       } from '@angular/http';

import { AppState, PREFERENCES_SET, PREFERENCES_UPDATE, CURRENT_PREFERENCE_UPDATE } from './../../store/constants';

@Injectable()
export class PreferencesService {
  constructor(
    private http: Http,
    private store: Store<AppState>,
  ) {}

  get(): void {
    this.http.get(`api/preference`)
      .map(res => res.json())
      .subscribe((res) => {
        this.store.dispatch({ type: PREFERENCES_SET, payload: res });
      });
  }

  change(preference: Object): void {
    this.http.post(`api/preference/change`, preference)
      .map(res => res.json())
      .subscribe((res) => {
        this.reloadPage(preference, res.user_preference);
        this.store.dispatch({ type: PREFERENCES_UPDATE, payload: res.preferences });
      });
  }

  private reloadPage(preference: Object, user_preference: Object): void {
    if(!Object.keys(preference).includes('language')) {
      location.reload(true);
    }
    else {
      this.store.dispatch({ type: CURRENT_PREFERENCE_UPDATE, payload: user_preference });
    }
  }
}
