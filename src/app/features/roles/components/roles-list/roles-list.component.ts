import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from '../../models/role.model';
import { SharedListComponent } from '../../../../shared/components/shared-list/shared-list.component';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule, SharedListComponent],
  template: `
    <div class="roles-list">
      <app-shared-list
        [items]="roles"
        [loading]="loading"
        [columns]="['Nombre','Descripción','Fecha de creación','Acciones']"
        [rowTemplate]="roleRow"
        [emptyMessage]="'No hay roles registrados.'">
      </app-shared-list>

      <ng-template #roleRow let-role>
        <tr>
          <td>{{ role.name }}</td>
          <td>{{ role.description }}</td>
          <td>{{ role.createdAt | date:'short' }}</td>
          <td>
            <div class="actions">
              <button (click)="edit.emit(role)" class="btn btn-primary">Editar</button>
              <button (click)="delete.emit(role.id)" class="btn btn-danger">Eliminar</button>
            </div>
          </td>
        </tr>
      </ng-template>
    </div>
  `,
  styles: `
    .roles-list { width: 100%; }
  `
})
export class RolesListComponent {
  @Input() roles: Role[] = [];
  @Input() loading = false;
  @Output() edit = new EventEmitter<Role>();
  @Output() delete = new EventEmitter<string>();
}
