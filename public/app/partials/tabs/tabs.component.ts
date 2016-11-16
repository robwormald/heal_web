import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'tabs-partial',
  templateUrl: './tabs.component.html',
})

export class TabsPartialComponent {
  @Input('tabs') tabs = [];
  @Input('currentTab') currentTab;
  @Output('currentTabChange') currentTabChange = new EventEmitter<string>();

  tabClassName(tab: string): string {
    const object = {
      true: ' active',
      false: ''
    };
    return 'capital-letter' + object[(this.currentTab == tab) as any];
  }

  switchTab(index: number, tab: string): void {
    this.currentTab = tab;
    this.currentTabChange.emit(tab);
  }
}
