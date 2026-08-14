import { HttpInterceptorFn } from '@angular/common/http';

export const erpHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    headers: req.headers.set('X-ERP-APP', 'testing')
  });

  return next(modifiedReq);
};