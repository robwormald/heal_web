import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'header-layout',
  templateUrl: 'header.component.html',
})

export class HeaderComponent {
  isCollapsed: boolean = true;

  constructor(private router: Router) {
    router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => this.isCollapsed = true);
  }
}
