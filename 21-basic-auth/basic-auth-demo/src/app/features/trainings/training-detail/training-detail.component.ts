import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { truthy } from '../../../shared/truthyness.helper';
import { selectTrainingWithSeats } from '../state/index';
import { Training } from '../state/training.model';

@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.component.html',
  styleUrls: ['./training-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingDetailComponent implements OnInit {

  trainingWithSeats?: Observable<Training>;
  bewertungForm = new UntypedFormGroup({
    stars: new UntypedFormControl(0),
    comment: new UntypedFormControl()
  });

  constructor(private readonly route: ActivatedRoute,
              private readonly store: Store) {
  }

  ngOnInit(): void {
    this.trainingWithSeats = this.route.paramMap
      .pipe(
        map(params => params.get('id') || ''),
        switchMap(id => this.store.select(selectTrainingWithSeats(id))),
        filter(truthy),
        tap(() => {
          this.bewertungForm.reset();
        })
      );
  }

}
