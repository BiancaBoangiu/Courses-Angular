import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.interface';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  forkJoin,
  map,
  of,
} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedUserSource: BehaviorSubject<Auth | null> =
    new BehaviorSubject<Auth | null>(null);
  loggedUser$: Observable<Auth> = this.loggedUserSource.asObservable().pipe(
    filter((value) => value !== null),
    map((value) => value as Auth)
  );

  courseId!: number;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private isAuthenticated = false;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      this.isAuthenticated = true;
      this.updateUser(JSON.parse(storedUser));
    }
  }

  updateUser(data: Auth) {
    this.loggedUserSource.next(data);
  }

  getUserData(): Auth | null {
    return this.loggedUserSource.getValue();
  }

  registerUser(
    email: string,
    password: string,
    image: 'string'
  ): Observable<Auth> {
    const usersURL = 'http://localhost:3000/users';
    const body = {
      email,
      password,
      image,
    };

    return this.http.post<Auth>(usersURL, body, this.httpOptions);
  }

  verifyUser(loginEmail: string): Observable<Auth[]> {
    const userURL = `http://localhost:3000/users?email=${loginEmail}`;
    const instructorURL = `http://localhost:3000/instructors?email=${loginEmail}`;

    const userRequest = this.http
      .get<Auth[]>(userURL)
      .pipe(catchError(() => of([])));
    const instructorRequest = this.http
      .get<Auth[]>(instructorURL)
      .pipe(catchError(() => of([])));

    return forkJoin([userRequest, instructorRequest]).pipe(
      map(([userData, instructorData]) => [...userData, ...instructorData])
    );
  }

  getUsers(): Observable<Auth[]> {
    const usersURL = 'http://localhost:3000/users';
    return this.http.get<Auth[]>(usersURL);
  }

  getUserById(id: number): Observable<Auth> {
    const userURL = `http://localhost:3000/users/${id}`;
    return this.http.get<Auth>(userURL);
  }

  login(userId: number, rememberMe: boolean): void {
    this.isAuthenticated = true;

    if (rememberMe) {
      localStorage.setItem('loggedUser', JSON.stringify(userId));
    }
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
