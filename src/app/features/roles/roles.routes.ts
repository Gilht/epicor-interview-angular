import { Route } from '@angular/router';

export const rolesRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../roles/roles.component').then((m) => m.RolesComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./components/role-form/role-form.component').then(
        (m) => m.RoleFormComponent,
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/role-form/role-form.component').then(
        (m) => m.RoleFormComponent,
      ),
  },
];
