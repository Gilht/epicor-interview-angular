import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';
import { showLoader, hideLoader } from '../store/loader.actions'

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  store.dispatch(showLoader());

  return next(req).pipe(
    finalize(() => store.dispatch(hideLoader()))
  );
};