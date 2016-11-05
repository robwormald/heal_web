import { Component, OnInit } from '@angular/core';

import { AppStore } from './../../app.store';
import { MonitorPartialService } from './monitor.service';
import { ServerMonitor } from './../../objects/index';
import { WebsocketService } from './../../global/index';

@Component({
  moduleId: module.id,
  selector: 'monitor-partial',
  templateUrl: 'monitor.component.html',
  providers: [MonitorPartialService, WebsocketService]
})

export class MonitorPartialComponent implements OnInit {
  serverMonitors: ServerMonitor[];
  serverPlayers: any[];

  constructor(
    private store: AppStore,
    private service: MonitorPartialService
  ) {}

  ngOnInit(): void {
    this.service.subscribe();
    this.store.changes.pluck('serverMonitors')
      .subscribe((serverMonitors: ServerMonitor[]) => this.serverMonitors = serverMonitors);
  }

  openPlayerList(players, modal): void {
    this.serverPlayers = players;
    modal.show();
  }

  onImageLoad(event): void {
    let parent = event.target.parentElement;
    parent.style.display = 'block';
  }

  onImageError(event): void {
    event.target.src = '/assets/noimg.jpg';
  }
}
