import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as TrainingActions from '../../features/trainings/state/collection/training.actions';
import * as SeatsActions from './seats.actions';

export const seatFeatureKey = 'seats';


export const initialState: Record<string, number> = {};


export const reducer = createReducer(
  initialState,
  on(TrainingActions.loadTrainingsSuccess, (state, action) => initialState),
  on(SeatsActions.loadSeat,
    (state, {seat}) => ({...state, [seat[0]]: seat[1]}) as Record<string, number>
  )
);

export const selectSeatsFeature = createFeatureSelector<Record<string, number>>(seatFeatureKey);

