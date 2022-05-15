import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, merge } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadTrainingsSuccess } from '../../features/trainings/state/collection/training.actions';
import { loadSeat } from './seats.actions';
import { SeatsService } from './seats.service';


@Injectable()
export class SeatsEffects {

  loadSeats = createEffect(() => this.actions$
    .pipe(
      ofType(loadTrainingsSuccess),
      switchMap(action => {
        return merge(...action.trainings.map(training => this.seatsService.getSeats(training.internal_id)
          .pipe(
            map(seat => loadSeat({seat})),
            catchError(err => EMPTY))
        ));
      })
    )
  );

  constructor(private actions$: Actions,
              private seatsService: SeatsService) {
  }

}
