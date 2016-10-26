import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ThemesPickerService {
  constructor(private http: Http) {}

  changeTheme(color: string): Promise<any> {
    return this.http.post(`api/themes/change`, { color }).toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
