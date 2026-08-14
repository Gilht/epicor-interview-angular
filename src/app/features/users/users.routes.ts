import { Route } from '@angular/router';

export const usersRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/users-form/users-form.component').then(
        (m) => m.UsersFormComponent,
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/users-form/users-form.component').then(
        (m) => m.UsersFormComponent,
      ),
  },
];
