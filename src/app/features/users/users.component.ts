import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersFormComponent, UsersListComponent } from './pages/index';
import { Router } from '@angular/router';
import { APIService } from '../../api/api.service';
import { environment } from '../../../environments/environment';
import { User, UsersResponse } from './models/users.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersListComponent, UsersFormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent implements OnInit {

  private router = inject(Router);
  private readonly _apiService = inject(APIService);
  readonly users = signal<User[]>([]);

  ngOnInit(): void {
    this._apiService.get<UsersResponse>(`${environment.API_URL}`).subscribe({
      next: (res) => {
        this.users.set(res.users);
      }
    });
  }

  public createUser() {
    this.router.navigate(['/users/create']);
    console.log('Navigating to create user form...');
  }

}
