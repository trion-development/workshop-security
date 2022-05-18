import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SortableDirective } from './sortable.directive';
import { TrainingEffects } from './state/collection/training.effects';
import * as fromTrainings from './state/index';
import { TrainingDetailComponent } from './training-detail/training-detail.component';

import { TrainingsRoutingModule } from './trainings-routing.module';
import { TrainingsComponent } from './trainings.component';


@NgModule({
  declarations: [
    TrainingsComponent,
    TrainingDetailComponent,
    SortableDirective
  ],
  imports: [
    CommonModule,
    TrainingsRoutingModule,
    StoreModule.forFeature(fromTrainings.trainingsFeatureKey, fromTrainings.trainingsReducers),
    EffectsModule.forFeature([TrainingEffects]),
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbDropdownModule
  ]
})
export class TrainingsModule {
}
