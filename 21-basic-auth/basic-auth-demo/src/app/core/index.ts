import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSeats from './seats/seats.reducer';


export interface State {
  [fromSeats.seatFeatureKey]: Record<string, number>;
}

export const reducers: ActionReducerMap<State> = {
  [fromSeats.seatFeatureKey]: fromSeats.reducer
};
