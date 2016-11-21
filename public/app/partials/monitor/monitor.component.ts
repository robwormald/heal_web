import { Component  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store      } from '@ngrx/store';

import { AppState, ServerMonitor } from './../../store/constants';

@Component({
  moduleId: module.id,
  selector: 'monitor-partial',
  templateUrl: 'monitor.component.html',
})

export class MonitorPartialComponent {
  // imagePath: string = '/assets/';
  imagePath: string = 'http://heal.lv/style/icons/maps/';
  monitorList: Observable<ServerMonitor[]>;
  serverPlayers: any[];

  constructor(
    private store: Store<AppState>,
  ) {
    this.monitorList = this.store.select('monitorList');
  }

  openPlayerList(players, modal): void {
    if(!players.length) return;

    this.serverPlayers = players;
    modal.show();
  }

  onImageLoad(event): void {
    let parent = event.target.parentElement;
    parent.style.display = 'block';
  }

  onImageError(event): void {
    event.target.src = this.imagePath + 'noimg.jpg';
  }
}
