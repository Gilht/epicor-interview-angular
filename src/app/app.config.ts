import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { rolesReducer } from './features/roles/store/roles.reducer';
import { RolesEffects } from './features/roles/store/roles.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { erpHeaderInterceptor } from './core/interceptors/erpHeader.interceptor';
import { DateFormat } from './core/interfaces/date-format.interface';
import { UsDateFormatService } from './core/services/us-date-format.service';
import { loaderReducer } from './core/store/loader.reducer';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(
      { roles: rolesReducer,
        loader: loaderReducer 
    }),
    provideEffects([RolesEffects]),
    { provide: DateFormat, useClass: UsDateFormatService },
    provideHttpClient(
      withInterceptors([erpHeaderInterceptor, loaderInterceptor])
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),    
  ]
};
