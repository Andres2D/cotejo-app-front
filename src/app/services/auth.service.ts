import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    const url = `${environment.urlServices}/auth`;
    return this.http.post<LoginResponse>(url, request)
      .pipe(
        tap((res) => {
          this.setToken(res.token);
          return res;
        }),
        catchError(err => {
          return of(err.error);
        })
      )
  }

  validateToken(): Observable<boolean> {
    const url = `${environment.urlServices}/auth/validate`;
    return this.http.get<LoginResponse>(url)
    .pipe(
      map((res) => {
        const {token} = res;
        this.setToken(token);
        return true;
      }),
      catchError(err => {
        return of(false); 
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}
