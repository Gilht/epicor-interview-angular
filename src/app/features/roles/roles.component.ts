import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Role } from './models/role.model';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import * as RolesActions from './store/roles.actions';
import { selectAllRoles, selectRolesLoading } from './store/roles.selectors';
import { Router } from '@angular/router';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, RolesListComponent, DialogComponent],
  template: `
    <div class="roles-page">
      <h2>Roles Panel</h2>

      <div class="actions">
        <button (click)="onAddRole()" class="btn btn-primary">Add Role</button>
      </div>

      <app-roles-list
        [roles]="(roles$ | async) ?? []"
        (edit)="onEdit($event)"
        (delete)="openDeleteDialog($event)"
      ></app-roles-list>

      @if (showDeleteDialog()) {
        <app-dialog
          [title]="'Delete Role'"
          [message]="'Are you sure you want to delete this role?'"
          [confirmText]="'Delete'"
          [cancelText]="'Cancel'"
          (confirmed)="confirmDelete()"
          (cancelled)="closeDeleteDialog()"
        ></app-dialog>
      }
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
  readonly showDeleteDialog = signal(false);
  private roleToDeleteId: string | null = null;

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

  openDeleteDialog(id: string): void {
    this.roleToDeleteId = id;
    this.showDeleteDialog.set(true);
  }

  confirmDelete(): void {
    if (this.roleToDeleteId) {
      this.store.dispatch(RolesActions.deleteRole({ id: this.roleToDeleteId }));
      this.closeDeleteDialog();
    }
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog.set(false);
    this.roleToDeleteId = null;
  }
}