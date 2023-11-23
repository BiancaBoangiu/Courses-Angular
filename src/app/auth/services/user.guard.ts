import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class UserGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  canActivate(): Observable<boolean> {
    const userId = localStorage.getItem('loggedUser');

    if (userId) {
      return this.http.get<Auth>(`http://localhost:3000/users/${userId}`).pipe(
        map((user) => {
          this.authService.updateUser(user);
          return true;
        })
      );
    } else {
      this.router.navigate(['/auth/login']);
      return of(false);
    }
  }
}
