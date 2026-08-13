import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Role } from './models/role.model';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import * as RolesActions from './store/roles.actions';
import { selectAllRoles, selectRolesLoading } from './store/roles.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, RolesListComponent],
  template: `
    <div class="roles-page">
      <h2>Roles Panel</h2>

      <div class="actions">
        <button (click)="onAddRole()" class="btn btn-primary">Add Role</button>
      </div>

      <app-roles-list
        [roles]="(roles$ | async) ?? []"
        (edit)="onEdit($event)"
        (delete)="onDelete($event)"
      ></app-roles-list>
    </div>
  `,
  styles: `
    .roles-page { max-width: 900px; margin: 2rem auto; padding: 0 1rem; font-family: sans-serif; }
    h2 { color: #3f51b5; margin-bottom: 1.5rem; }
    .actions { margin-bottom: 1rem; }
    .btn { padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
    .btn-primary { background: #3f51b5; color: white; }
  `
})
export class RolesComponent implements OnInit {
  roles$: Observable<Role[]>;

  constructor(private store: Store, private router: Router) {
    this.roles$ = this.store.select(selectAllRoles);
  }

  ngOnInit(): void {
    this.store.dispatch(RolesActions.loadRoles());
  }

  onAddRole(): void {
    this.router.navigate(['/roles/create']);
  }

  onEdit(role: Role): void {
    this.router.navigate(['/roles/edit', role.id]);
  }

  onDelete(id: string): void {
    this.store.dispatch(RolesActions.deleteRole({ id }));
  }
}
