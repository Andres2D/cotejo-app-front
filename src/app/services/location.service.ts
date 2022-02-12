import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  goBackMatch: Subject<boolean> = new Subject();
}
