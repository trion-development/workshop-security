import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { selectTrainingPagination } from '../index';
import * as TrainingActions from './training.actions';
import { TrainingService } from './training.service';

@Injectable()
export class TrainingEffects {

  loadTrainings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrainingActions.loadTrainings),
      concatLatestFrom(() => this.store.select(selectTrainingPagination)),
      concatMap(([action, pagination]) =>
        this.trainingService.getTrainings(action.page ?? pagination.page, action.pageSize ?? pagination.pageSize, action.sort)
          .pipe(
            map(({content, totalElements}) => TrainingActions.loadTrainingsSuccess({
              trainings: content,
              totalElements
            })),
            catchError(error => of(TrainingActions.loadTrainingsFailure({error: error.message})))
          )
      )
    );
  });

  addTrainings = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrainingActions.addTraining),
      exhaustMap(action => {
        return this.trainingService.addTraining(action.name, action.description, action.location, action.trainer)
          .pipe(
            map(() => TrainingActions.loadTrainings({}))
          );
      })
    );
  });

  constructor(private actions$: Actions,
              private store: Store,
              private trainingService: TrainingService) {
  }
}

