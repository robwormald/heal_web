import { Component, OnInit } from '@angular/core';
import { EmojiSupportService } from './global/emoji-support.service';

import 'actioncable-js';
declare let ActionCable:any;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  providers: [EmojiSupportService]
})

export class AppComponent implements OnInit {
  constructor(private emojiSupport: EmojiSupportService) {}

  ngOnInit(): void {
    window['App'] = {};
    window['App'].cable = ActionCable.createConsumer();

    this.emojiSupport.init();
  }
}
