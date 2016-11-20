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

  switchTab(index: number, tab: string): void {
    this.currentTab = tab;
    this.currentTabChange.emit(tab);
  }
}
