import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThemesPickerService {
  constructor(private http: Http) {}

  getThemes(): Observable<any> {
    return this.http.get(`api/themes`).map(res => res.json());
  }

  changeColor(color: string): Observable<any> {
    return this.http.post(`api/themes/color`, { color });
  }

  changeBrightness(brightness: string): Observable<any> {
    return this.http.post(`api/themes/brightness`, { brightness });
  }
}
