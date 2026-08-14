import { Component, signal, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { APIService } from '../../../../api/api.service';
import { CommonModule } from '@angular/common';
import { Role } from '../../../roles/models/role.model';
import { User } from '../../models/users.model';
import { Observable } from 'rxjs';
import { selectAllRoles } from '../../../roles/store/roles.selectors';
import * as RolesActions from '../../../roles/store/roles.actions';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.scss',
})
export class UsersFormComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private apiService = inject(APIService);

  roles$: Observable<Role[]>;
  readonly roleOptions: string[] = ['admin', 'user', 'moderator'];
  readonly isSubmitting = signal(false);
  readonly isEditMode = signal(false);

  readonly form = new FormGroup({
    id: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    firstName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    age: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    role: new FormControl<Role>(
      {
        id: '0',
        name: 'Choose Item',
        description: '',
        createdAt: ''
      }, {
      nonNullable: true,
      validators: [Validators.required],
    }), 
  });

  constructor() {
    this.roles$ = this.store.select(selectAllRoles);
  }

  ngOnInit(): void {
    this.store.dispatch(RolesActions.loadRoles());

    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      this.isEditMode.set(true);
      this.loadUserData(Number(userId));
    }
  }

  private loadUserData(userId: number): void {
    this.apiService.getById<User>(`${environment.API_URL}/${userId}`).subscribe({
      next: (user) => {
        this.form.patchValue({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          role: { id: user.role.id,
             name: user.role.name,
              description: user.role.description, 
              createdAt: user.role.createdAt }
        });
      },
      error: () => {
        console.error('Error loading user data');
      },
    });
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
    const { firstName, lastName, age, role } = this.form.getRawValue();
    const payload: Partial<User> = {
      firstName,
      lastName,
      age,
      role
    };

    if (this.isEditMode()) {
      this.apiService.put<Partial<User>>(
        `${environment.API_URL}/${this.form.getRawValue().id}`,
        payload
      ).subscribe({
        next: (user) => {
          this.isSubmitting.set(false);
          alert('User updated successfully');
          this.form.patchValue(user);
        },
        error: (err) => {
          this.isSubmitting.set(false);
          alert('Error on updating user');
          console.error('Error:', err);
        }
      });
    } else {
      this.apiService.post<Partial<User>>(
        `${environment.API_URL}/add`,
        payload
      ).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          alert('User created successfully');
          this.form.reset();
        },
        error: (err) => {
          this.isSubmitting.set(false);
          alert('Something went wrong while creating the user');
          console.error('Error:', err);
        }
      });
    }
  }
}
