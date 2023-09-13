import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user-interface';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userDataSubject = new Subject<User>();
  userData$ = this.userDataSubject.asObservable();
  constructor(private http: HttpClient, private authService: AuthService) {}

  updateUserInfo(
    firstName: string,
    lastName: string,
    description: string,
    education: string,
    id: number
  ): Observable<User> {
    const userURL = `http://localhost:3000/users/${id}`;
    const body = { firstName, lastName, description, education };
    return this.http.patch<User>(userURL, body);
  }

  updateNewPassword(newPassword: string, userId: number): Observable<User> {
    const userURL = `http://localhost:3000/users/${userId}`;
    const body = { password: newPassword };

    return this.http.patch<User>(userURL, body);
  }
  updateNewProfileImage(
    newProfileImage: string,
    userId: number
  ): Observable<User> {
    const userURL = `http://localhost:3000/users/${userId}`;
    const body = { image: newProfileImage };

    return this.http.patch<User>(userURL, body);
  }

  deleteUserAccount(userId: number): Observable<User> {
    const userURL = `http://localhost:3000/users/${userId}`;
    return this.http.delete<User>(userURL);
  }

  emitUserData(data: User) {
    this.userDataSubject.next(data);
  }
}
