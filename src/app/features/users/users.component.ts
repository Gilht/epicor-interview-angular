import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersFormComponent, UsersListComponent } from './components/index';
import { Router } from '@angular/router';
import { APIService } from '../../api/api.service';
import { environment } from '../../../environments/environment';
import { User, UsersResponse } from './models/users.model';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,
    LoaderComponent,
    UsersListComponent, UsersFormComponent, DialogComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private router = inject(Router);
  private readonly _apiService = inject(APIService);
  readonly users = signal<User[]>([]);
  showDeleteDialog = false;
  userToDeleteId: number | null = null;
  idUserToEdit: number | null = null;

  ngOnInit(): void {
    this._apiService.get<UsersResponse>(`${environment.API_URL}`).subscribe({
      next: (res) => {
        this.users.set(res.users);
      }
    });
  }

  createUser(): void {
    this.router.navigate(['/users/create']);
  }

  editUser(userId: number): void {
    this.router.navigate(['/users/edit/', userId]);
  }
  
  openDeleteDialog(userId: number): void {
    this.userToDeleteId = userId;
    this.showDeleteDialog = true;
  }

  confirmDelete(): void {
    if (this.userToDeleteId !== null) {
      this.users.update((currentUsers) => currentUsers.filter((user) => user.id !== this.userToDeleteId));
    }
    this.closeDeleteDialog();
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.userToDeleteId = null;
  }
}
