import { createAction, props } from '@ngrx/store';
import { SortEvent } from '../../sortable.directive';
import { Training } from '../training.model';

export const loadTrainings = createAction(
  '[Training] Load Trainings',
  props<{ page?: number, pageSize?: number, sort?: SortEvent }>()
);

export const loadTrainingsSuccess = createAction(
  '[Training] Load Trainings Success',
  props<{ trainings: Training[], totalElements: number }>()
);

export const loadTrainingsFailure = createAction(
  '[Training] Load Trainings Failure',
  props<{ error: string }>()
);

export const addTraining = createAction(
  '[Training] Add Training',
  props<{ name: string, location: string, description: string, trainer: string }>()
);

export const addTrainingSuccess = createAction(
  '[Training] Add Training SUCCESS',
  props<{training: Training}>()
);
