import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/users.model';
import { SharedListComponent } from '../../../../shared/components/shared-list/shared-list.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, SharedListComponent],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {

  @Input() users: Partial<User>[] = [];

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
}
