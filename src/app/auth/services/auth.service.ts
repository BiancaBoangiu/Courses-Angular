import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reviews } from 'src/app/courses/models/reviews.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUser!: Auth;
  courseId!: number;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  registerUser(
    email: string,
    password: string,
    userType: string,
    reviews: Reviews[]
  ): Observable<Auth> {
    const usersURL = 'http://localhost:3000/users';
    const body = {
      email: email,
      password: password,
      userType: userType,
      reviews: reviews,
    };

    return this.http.post<Auth>(usersURL, body, this.httpOptions);
  }

  verifyUser(loginEmail: string): Observable<Auth[]> {
    const userURL = `http://localhost:3000/users?email=${loginEmail}`;
    return this.http.get<Auth[]>(userURL);
  }
}
