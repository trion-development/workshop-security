import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SortEvent } from '../../sortable.directive';
import { Training } from '../training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  constructor(private http: HttpClient) {
  }

  getTrainings(page?: number, pageSize?: number, sort?: SortEvent): Observable<{ content: Training[], totalElements: number }> {
    let params = new HttpParams();
    if (pageSize) {
      params = params.set('size', pageSize);
    }
    if (page) {
      params = params.set('page', page - 1);
    }
    if (sort?.direction) {
      params = params.set('sort', sort.column);
      params = params.set('direction', sort.direction);
    }
    return this.http.get<{ content: Training[], totalElements: number }>(environment.api + '/trainings', {params});
  }

  addTraining(name: string, description: string, location: string, trainer: string): Observable<Training> {
    return this.http.post<Training>(environment.api + '/trainings', {
      topic: name,
      description,
      location,
      instructor: {name: trainer}
    });
  }
}
