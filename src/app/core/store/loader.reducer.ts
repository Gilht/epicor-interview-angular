import { Action } from "@ngrx/store";

export function loaderReducer(
  state: boolean = false,
  action: Action
): boolean {
  switch (action.type) {
    case '[loader] show':
      return true;

    case '[loader] hide':
      return false;

    default:
      return state;
  }
}