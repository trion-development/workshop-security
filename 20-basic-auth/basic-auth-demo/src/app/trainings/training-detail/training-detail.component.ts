import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { truthy } from '../../shared/truthyness.helper';
import { selectUserName } from '../../shared/user-info/index';
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
  bewertungForm = new FormGroup({
    stars: new FormControl(0),
    comment: new FormControl()
  });

  private user?: Observable<string | undefined>;

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
    this.user = this.store.pipe(select(selectUserName));
  }

}
