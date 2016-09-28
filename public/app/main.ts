import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { BBCodeService } from './global/bbcode.service';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule, [BBCodeService]);
