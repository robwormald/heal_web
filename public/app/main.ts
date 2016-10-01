import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import { BBCodeService } from './global/bbcode.service';
import { StateService } from './global/state.service';
import { WebsocketService } from './global/websocket.service';

let ActionCable = require('actioncable-js');

window['App'] = {};
window['App'].cable = ActionCable.createConsumer();

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule, [BBCodeService, StateService, WebsocketService]);
