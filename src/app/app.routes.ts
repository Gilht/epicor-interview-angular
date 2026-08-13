import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'roles', loadChildren: () => import('./features/roles/roles.routes').then(m => m.rolesRoutes) },
  { path: 'users', loadChildren: () => import('./features/users/users.routes').then(m => m.usersRoutes) },
  { path: '', redirectTo: 'roles', pathMatch: 'full' },
];
