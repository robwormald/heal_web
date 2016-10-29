import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { EmojiSupportService } from './global/index';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [EmojiSupportService]
})

export class AppComponent implements OnInit {
  private viewContainerRef: ViewContainerRef;

  constructor(
    private emojiSupport: EmojiSupportService,
    viewContainerRef: ViewContainerRef
  ) {
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit(): void {
    this.emojiSupport.init();
  }
}
