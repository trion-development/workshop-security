import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SortEvent } from './sortable.directive';
import { addTraining, loadTrainings } from './state/collection/training.actions';
import { selectTrainingPagination, selectTrainingsErrors, selectTrainingsWithSeats } from './state/index';
import { Training } from './state/training.model';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingsComponent implements OnInit {
  trainingsWithSeats?: Observable<Training[]>;
  error?: Observable<string | undefined>;
  pagination?: Observable<{ totalElements: number; page: number; pageSize: number }>;

  sort?: SortEvent;

  location = new UntypedFormControl('', Validators.required);
  name = new UntypedFormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]);
  description = new UntypedFormControl('', Validators.required);
  trainer = new UntypedFormControl('', Validators.required);
  trainingForm = new UntypedFormGroup({
    location: this.location,
    name: this.name,
    description: this.description,
    trainer: this.trainer
  });

  constructor(private readonly store: Store) {
    this.pagination = this.store.select(selectTrainingPagination);
    this.trainingsWithSeats = this.store.select(selectTrainingsWithSeats);
    this.error = this.store.select(selectTrainingsErrors);
    setTimeout(() => this.store.dispatch(loadTrainings({sort: this.sort})));
  }

  ngOnInit(): void {
  }

  trackById(index: number, training: Training): string {
    return training.internal_id;
  }

  onSort(sort: SortEvent) {
    this.sort = sort;
    this.store.dispatch(loadTrainings({sort}));
  }

  loadPage(page: number): void {
    this.store.dispatch(loadTrainings({page, sort: this.sort}));
  }

  changePageSize(pageSize: number): void {
    this.store.dispatch(loadTrainings({pageSize, sort: this.sort}));
  }

  addNewTraining(): void {
    if (this.trainingForm.invalid) {
      this.trainingForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(addTraining(this.trainingForm.value));
  }
}
