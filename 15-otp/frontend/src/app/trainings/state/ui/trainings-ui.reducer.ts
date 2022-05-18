import { createReducer, on } from '@ngrx/store';
import * as TrainingActions from '../collection/training.actions';


export const trainingsUiFeatureKey = 'ui';

export interface TrainingsUIState {
  error?: string;
  loading?: boolean;
  pagination: {
    totalElements: number;
    page: number,
    pageSize: number
  };
}

export const initialState: TrainingsUIState = {
  pagination: {
    totalElements: 0,
    page: 1,
    pageSize: 3
  }
};


export const reducer = createReducer(
  initialState,
  on(TrainingActions.loadTrainings, (state, action) => ({
    loading: true,
    pagination: {
      ...state.pagination,
      page: action.page ?? state.pagination.page,
      pageSize: action.pageSize ?? state.pagination.pageSize
    }
  })),
  on(TrainingActions.loadTrainingsSuccess, (state, action) => ({pagination: {...state.pagination, totalElements: action.totalElements}})),
  on(TrainingActions.loadTrainingsFailure, (state, action) => ({
    error: action.error,
    pagination: initialState.pagination
  }))
);

export const getTrainingLoading = (state: TrainingsUIState) => !!state.loading;
export const getTrainingError = (state: TrainingsUIState) => state.error;
