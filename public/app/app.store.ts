import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User, PollView, PollList } from './objects/index';

interface State {
  onlineUsers: User[];
  currentUser: User;
  currentPoll: PollView;
  latestPoll: PollView;
  pollList: PollList;
};

const state: State = {
  onlineUsers: [] as User[],
  currentUser: {} as User,
  currentPoll: {} as PollView,
  latestPoll: {} as PollView,
  pollList: {} as PollList,
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
