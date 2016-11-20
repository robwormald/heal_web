import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { MonitorPartialService } from './monitor.service';
import { AppState, ServerMonitor } from './../../store/constants';
import { WebsocketService } from './../../global/index';

@Component({
  moduleId: module.id,
  selector: 'monitor-partial',
  templateUrl: 'monitor.component.html',
  providers: [MonitorPartialService, WebsocketService]
})

export class MonitorPartialComponent implements OnInit {
  // imagePath: string = '/assets/';
  imagePath: string = 'http://heal.lv/style/icons/maps/';
  monitorList: Observable<ServerMonitor[]>;
  serverPlayers: any[];

  constructor(
    private store: Store<AppState>,
    private service: MonitorPartialService
  ) {}

  ngOnInit(): void {
    this.monitorList = this.store.select('monitorList');
    this.service.subscribe();
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
