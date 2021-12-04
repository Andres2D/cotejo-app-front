import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  urlBaseRating: string = `${environment.urlServices}/match`;

  getMatchs(): Observable<any> {
    return this.http.get(this.urlBaseRating)
  }
}
