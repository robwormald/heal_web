import { Component, OnInit } from '@angular/core';

import 'actioncable-js';
declare let ActionCable:any;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
    window['App'] = {};
    window['App'].cable = ActionCable.createConsumer();
  }
}
