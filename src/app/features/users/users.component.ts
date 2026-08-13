import { Component, inject } from '@angular/core';
import { UsersFormComponent, UsersListComponent } from './pages/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersListComponent, UsersFormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {

  private router = inject(Router);

  public createUser() {
    this.router.navigate(['/users/create']);
    console.log('Navigating to create user form...');
  }

}
