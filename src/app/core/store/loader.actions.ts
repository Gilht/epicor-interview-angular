import { createAction, props } from '@ngrx/store';

export const showLoader = createAction('[loader] show');

export const hideLoader = createAction('[loader] hide');