import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { selectSeatsFeature } from '../../../core/seats/seats.reducer';
import * as fromTraining from './collection/training.reducer';
import { trainingCollectionFeatureKey } from './collection/training.reducer';
import { getTraining } from './collection/training.selectors';
import { Training } from './training.model';
import * as fromTrainingsUi from './ui/trainings-ui.reducer';
import { getTrainingError, getTrainingLoading, trainingsUiFeatureKey } from './ui/trainings-ui.reducer';

export const trainingsFeatureKey = 'trainings';

export interface TrainingsState {
  [fromTraining.trainingCollectionFeatureKey]: fromTraining.TrainingCollectionState;
  [fromTrainingsUi.trainingsUiFeatureKey]: fromTrainingsUi.TrainingsUIState;
}

export const trainingsReducers: ActionReducerMap<TrainingsState> = {
  [fromTraining.trainingCollectionFeatureKey]: fromTraining.reducer,
  [fromTrainingsUi.trainingsUiFeatureKey]: fromTrainingsUi.reducer
};


export const selectTrainingState = createFeatureSelector<TrainingsState>(trainingsFeatureKey);
export const selectTrainingCollectionState = createSelector(selectTrainingState, state => state[trainingCollectionFeatureKey]);
export const selectTrainingUIState = createSelector(selectTrainingState, state => state[trainingsUiFeatureKey]);

export const selectTrainingsLoading = createSelector(selectTrainingUIState, getTrainingLoading);
export const selectTrainingsErrors = createSelector(selectTrainingUIState, getTrainingError);
export const selectTrainingPagination = createSelector(selectTrainingUIState, state => state.pagination);
export const selectTraining = (id: string) => createSelector(selectTrainingCollectionState, getTraining(id));

export const selectTrainingWithSeats = (id: string) => createSelector(selectTraining(id), selectSeatsFeature,
  (training, bewertungen) => {
    if (!training) {
      return training;
    }
    return {...training, seats: bewertungen[training.internal_id]};
  }
);

export const selectTrainingsWithSeats = createSelector(selectSeatsFeature, selectTrainingCollectionState,
  (bewertungen, trainingState): Training[] => {
    return trainingState.ids
      .map(id => ({...(trainingState.trainingsMap[id] as Training), seats: bewertungen[id]}));
  }
);

