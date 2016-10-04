import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User, PollObject } from './objects/index';

interface State {
  currentUser: User;
  currentPoll: PollObject;
  latestPoll: PollObject;
};

const state: State = {
  currentUser: {} as User,
  currentPoll: {} as PollObject,
  latestPoll: {} as PollObject,
};

const store = new BehaviorSubject<State>(state);

export class AppStore {
  store = store;
  changes = store.asObservable().distinctUntilChanged();
  // Usage this.changes.pluck('currentUser').subscribe();

  getState(): State {
    return this.store.value;
  }

  setState(state: State): void {
    this.store.next(state);
  }

  setKeyValue(key: string, value: any): void {
    var state:State = Object.assign({}, this.getState(), { [key]: value });
    this.setState(state);
  }

  getKeyValue(key: string): any {
    return this.getState()[key];
  }
}
