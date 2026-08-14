import { Route } from '@angular/router';
import { editGuard } from '../../core/guards/edit.guard';

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
    canActivate: [editGuard],
    loadComponent: () =>
      import('./components/users-form/users-form.component').then(
        (m) => m.UsersFormComponent,
      ),
  },
];
