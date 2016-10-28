import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'header-layout',
  templateUrl: 'header.component.html',
})

export class HeaderComponent {
  isCollapsed: boolean = true;

  constructor(router: Router) {
    router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationEnd) {
        this.isCollapsed = true;
      }
    });
  }
}
