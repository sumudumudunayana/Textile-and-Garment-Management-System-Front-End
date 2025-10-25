import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

type LoginResponse = { id: number; userName: string; userRole: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8080/user_account';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.base}/login`, { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('userId', String(res.id));
          localStorage.setItem('userName', res.userName);
          localStorage.setItem('role', res.userRole);
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  get role(): string | null {
    return localStorage.getItem('role');
  }

  get userName(): string | null {
    return localStorage.getItem('userName');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('role');
  }
}
