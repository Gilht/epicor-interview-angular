import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { Role } from '../../models/role.model';
import * as RolesActions from '../../store/roles.actions';
import { selectAllRoles } from '../../store/roles.selectors';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-page">
      <button type="button" class="secondary" (click)="onCancel()"><- Back</button>

      <div class="form-container">

        <div class="header-row">
          <h3>{{ editingRole ? 'Edit Role' : 'New Role' }}</h3>
        </div>

        <form (ngSubmit)="onSubmit()">
          <div class="field">
            <label for="name">Name</label>
            <input id="name" name="name" [(ngModel)]="name" required placeholder="Ej: Administrador" />
          </div>

          <div class="field">
            <label for="description">Description</label>
            <textarea id="description" name="description" [(ngModel)]="description" placeholder="Description of the role"></textarea>
          </div>

          <div class="actions">
            <button type="submit" [disabled]="!name.trim()">{{ editingRole ? 'Update' : 'Create' }}</button>
            <button type="button" class="secondary" (click)="onCancel()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: `
    .form-page{max-width:700px;margin:2rem auto;padding:0 1rem;font-family:sans-serif}.form-container{background:#fff;padding:1.5rem;border-radius:8px;margin-bottom:1.5rem}.header-row{display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:1rem}h3{margin:0}.field{margin-bottom:1rem;display:flex;flex-direction:column;gap:.25rem}label{font-weight:500;font-size:.9rem}input,textarea{padding:.5rem;border:1px solid #ccc;border-radius:4px;font-size:1rem;width:100%;box-sizing:border-box}textarea{resize:vertical;min-height:80px}.actions{display:flex;gap:.5rem}button{padding:.5rem 1.2rem;border:none;border-radius:4px;cursor:pointer;background:#3f51b5;color:#fff}button.secondary{background:#888}button:disabled{opacity:.5;cursor:not-allowed}
  `
})
export class RoleFormComponent implements OnInit, OnChanges {
  @Input() editingRole: Role | null = null;
  @Output() save = new EventEmitter<Role>();
  @Output() cancel = new EventEmitter<void>();

  name = '';
  description = '';

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.store.select(selectAllRoles)
        .pipe(take(1))
        .subscribe((roles) => {
          this.editingRole = roles.find((role) => role.id === id) ?? null;
          this.syncForm();
        });
      return;
    }

    this.syncForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editingRole']) {
      this.syncForm();
    }
  }

  onSubmit(): void {
    if (!this.name.trim()) return;

    const role: Role = {
      id: this.editingRole?.id ?? crypto.randomUUID(),
      name: this.name.trim(),
      description: this.description.trim(),
      createdAt: this.editingRole?.createdAt ?? new Date().toISOString(),
    };

    if (this.editingRole) {
      this.store.dispatch(RolesActions.updateRole({ role }));
    } else {
      this.store.dispatch(RolesActions.addRole({ role }));
    }

    this.save.emit(role);
    this.router.navigate(['/roles']);
  }

  onCancel(): void {
    this.cancel.emit();
    this.router.navigate(['/roles']);
  }

  private syncForm(): void {
    this.name = this.editingRole?.name ?? '';
    this.description = this.editingRole?.description ?? '';
  }
}
