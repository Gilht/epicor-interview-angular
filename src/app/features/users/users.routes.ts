import { Route } from '@angular/router';

export const usersRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/users-form/users-form.component').then(
        (m) => m.UsersFormComponent,
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/users-form/users-form.component').then(
        (m) => m.UsersFormComponent,
      ),
  },
];
