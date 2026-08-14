import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectIsLoading } from '../../../core/store/loader.selectors';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
private readonly store = inject(Store);
readonly isLoading = this.store.selectSignal(selectIsLoading);
}
