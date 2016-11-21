import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

let ActionCable = require('actioncable-js');

window['App'] = {};
window['App'].cable = ActionCable.createConsumer();

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
