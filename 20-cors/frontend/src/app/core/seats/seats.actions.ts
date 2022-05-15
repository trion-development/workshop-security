import { createAction, props } from '@ngrx/store';


export const loadSeat = createAction(
  '[Seat/API] Load Seats',
  props<{ seat: [string, number] }>()
);
