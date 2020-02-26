import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SoilRestResult, Soil } from './soil';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoilService {

  constructor(private http: HttpClient) { }

  findSoilDT(
    filter: string, sortColumn: string, sortDirection: string, pageNumber: number, pageSize: number
  ): Observable<SoilRestResult> {

    return this.http.get<SoilRestResult>('/api/v1/soil/dt', {
      params: new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortColumn', sortColumn)
        .set('sortDirection', sortDirection)
        .set('searchInput', filter)
    })
    // .pipe(map(res => res['result']));
  }

  save(soil: Soil): Observable<Soil> {
    return this.http.post<Soil>('/api/v1/soil', soil);
  }

  delete(id: number) {
    return this.http.delete('/api/v1/soil/'.concat(id.toString()));
  }

}
