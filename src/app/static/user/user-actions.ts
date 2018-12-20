import { User } from '@app/store/user.model';
import { Action } from '@ngrx/store';

export enum UserActionTypes {
  ADD = '[User] Add',
  UPDATE = '[User] Update',
  DELETE = '[User] Delete'
}
export class ActionUserAdd implements Action {
  readonly type = UserActionTypes.ADD;
  readonly payload: User;

  constructor(user: User) {
    this.payload = user;
  }
}
export class ActionUserUpdate implements Action {
  readonly type = UserActionTypes.UPDATE;
  readonly payload: User;

  constructor(user: User) {
    this.payload = user;
  }
}
export class ActionUserDelete implements Action {
  readonly type = UserActionTypes.DELETE;
  readonly payload: User;

  constructor(id: number) {
    this.payload = null;
  }
}
