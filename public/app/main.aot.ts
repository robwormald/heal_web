let ActionCable = require('actioncable-js');

window['App'] = {};
window['App'].cable = ActionCable.createConsumer();

import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/public/app/app.module.ngfactory.js';
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
