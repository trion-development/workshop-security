import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {
  constructor(private http: HttpClient) {
  }

  getSeats(trainingId: string): Observable<[string, number]> {
    return this.http.get<number[]>(environment.api + '/randomnumber?min=0&max=20')
      .pipe(map(nrs => ([trainingId, nrs[0]]) as [string, number]));
  }

}
