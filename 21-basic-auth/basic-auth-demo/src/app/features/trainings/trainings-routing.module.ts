import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingDetailComponent } from './training-detail/training-detail.component';
import { TrainingsComponent } from './trainings.component';

const routes: Routes = [
  { path: '', component: TrainingsComponent },
  { path: ':id', component: TrainingDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingsRoutingModule { }
