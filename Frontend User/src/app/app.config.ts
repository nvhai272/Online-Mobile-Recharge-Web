import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimationsAsync('noop'),
  provideAnimationsAsync(),
  provideToastr(
    {
      closeButton: true,
      timeOut: 3000
      // positionClass: 'toast-bottom-right',
      // progressAnimation: 'increasing'
    }
  )]
};
