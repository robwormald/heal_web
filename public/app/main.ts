import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import { BBCodeService, WebsocketService } from './global/index';

let ActionCable = require('actioncable-js');

window['App'] = {};
window['App'].cable = ActionCable.createConsumer();

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule, [BBCodeService, WebsocketService]);
