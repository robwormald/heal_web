import { Component, OnInit } from '@angular/core';
import { EmojiSupportService } from './global/emoji-support.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [EmojiSupportService]
})

export class AppComponent implements OnInit {
  constructor(private emojiSupport: EmojiSupportService) {}

  ngOnInit(): void {
    this.emojiSupport.init();
  }
}
