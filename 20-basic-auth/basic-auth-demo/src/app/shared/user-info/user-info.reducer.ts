import { createReducer, on } from '@ngrx/store';
import { loadUserInfosFailure, loadUserInfosSuccess } from './user-info.actions';
import { UserInfo } from './user-info.model';


export interface UserInfoState {
  user?: UserInfo;
  error?: string;
}

export const initialState: UserInfoState = {
};


export const userInfoReducer = createReducer(
  initialState,
  on(loadUserInfosSuccess, (state, action) => ({user: action.user})),
  on(loadUserInfosFailure, (state, action) => ({error: action.error}))
);

export const getUser = (state: UserInfoState) => state.user;
export const getError = (state: UserInfoState) => state.error;
