import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'roles', loadComponent: () => import('./features/roles/roles.component').then(m => m.RolesComponent) },
  { path: 'users', loadChildren: () => import('./features/users/users.routes').then(m => m.usersRoutes) },
  { path: '', redirectTo: 'roles', pathMatch: 'full' },
];
