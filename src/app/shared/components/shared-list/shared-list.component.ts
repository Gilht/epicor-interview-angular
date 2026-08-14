import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-list',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './shared-list.component.scss',
  template: `
    <div class="shared-list">

      <table>
        <thead>
          <tr>
            <th *ngFor="let col of columns">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <ng-container *ngIf="items && items.length; else empty">
            <ng-container *ngFor="let item of items">
              <ng-container *ngTemplateOutlet="rowTemplate ? rowTemplate : defaultRow; context:{ $implicit: item }"></ng-container>
            </ng-container>
          </ng-container>

          <ng-template #empty>
            <tr>
              <td [attr.colspan]="columns.length || 1" class="empty">{{ emptyMessage }}</td>
            </tr>
          </ng-template>

          <ng-template #defaultRow let-item>
            <tr>
              <td [attr.colspan]="columns.length">{{ item | json }}</td>
            </tr>
          </ng-template>
        </tbody>
      </table>
    </div>
  `
})
export class SharedListComponent {
  @Input() items: any[] = [];
  @Input() columns: string[] = [];
  @Input() rowTemplate: TemplateRef<any> | null = null;
  @Input() emptyMessage = 'No hay registros.';
}
