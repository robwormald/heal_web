import { Component, OnInit } from '@angular/core';
import { EmojiSupportService } from './global/index';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [EmojiSupportService]
})

export class AppComponent implements OnInit {
  constructor(private emojiSupport: EmojiSupportService) {
  }

  ngOnInit(): void {
    this.emojiSupport.init();
  }
}
