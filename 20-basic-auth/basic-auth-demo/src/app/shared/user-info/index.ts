import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSeats from '../seats/seats.reducer';
import { getUser, userInfoReducer, UserInfoState } from './user-info.reducer';


export interface State {
  userInfo: UserInfoState;
  [fromSeats.seatFeatureKey]: Record<string, number>;
}

export const reducers: ActionReducerMap<State> = {
  userInfo: userInfoReducer,
  [fromSeats.seatFeatureKey]: fromSeats.reducer
};


export const selectUserInfoState = createFeatureSelector<UserInfoState>('userInfo');
export const selectUserInfo = createSelector(selectUserInfoState, getUser);
export const selectUserName = createSelector(selectUserInfo, user => user?.name);
