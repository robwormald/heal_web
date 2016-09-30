import { Injectable } from '@angular/core';

@Injectable()
export class StateService {
  private _currentUser:any = {};

  get(key: string): any { return this[`_${key}`]; }
  set(key: string, value: any): void { this[`_${key}`] = value; }
}
