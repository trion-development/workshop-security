import { createAction, props } from '@ngrx/store';
import { UserInfo } from './user-info.model';

export const loadUserInfosSuccess = createAction(
  '[UserInfo] Load UserInfos Success',
  props<{ user: UserInfo }>()
);

export const loadUserInfosFailure = createAction(
  '[UserInfo] Load UserInfos Failure',
  props<{ error: string }>()
);
