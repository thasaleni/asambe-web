import { Action } from '@ngrx/store';
export class SelectUserType implements Action {
  readonly type = UserActionTypes.SELECT_USER_TYPE;
  constructor(public payload: any) {}
}
export enum UserActionTypes {
  SELECT_USER_TYPE = 'SELECT_USER_TYPE'
}
export type UserActions = SelectUserType;
