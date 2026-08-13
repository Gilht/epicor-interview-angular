import { Component, signal, inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Role } from '../../../roles/models/role.model';
import { Observable } from 'rxjs';
import { selectAllRoles } from '../../../roles/store/roles.selectors';
import * as RolesActions from '../../../roles/store/roles.actions';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

type UserRole = 'admin' | 'user' | 'moderator';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss'
})
export class UsersFormComponent implements OnInit {
    roles$: Observable<Role[]>;
  readonly roleOptions: UserRole[] = ['admin', 'user', 'moderator'];
  readonly isSubmitting = signal(false);
  

  readonly form = new FormGroup({
    id: new FormControl<number>(0, {
      validators: [Validators.required]
    }),
    firstName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    lastName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    maidenName: new FormControl<string>('', { nonNullable: true }),
    age: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    role: new FormControl<UserRole>('admin', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  constructor(private store: Store, private router: Router) {
      this.roles$ = this.store.select(selectAllRoles);
    }

  ngOnInit(): void {
    this.store.dispatch(RolesActions.loadRoles());
  }

  goBack(): void {
    window.history.back();
  }

  saveUser(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    console.log(this.form.getRawValue());
    this.isSubmitting.set(false);
  }
}
