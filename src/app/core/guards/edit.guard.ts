import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const editGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (id && Number(id) > 10) {
    return router.createUrlTree(['/users']);
  }

  return true;
};