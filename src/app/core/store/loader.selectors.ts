import { createFeatureSelector } from '@ngrx/store';

export const selectIsLoading = createFeatureSelector<boolean>('loader');