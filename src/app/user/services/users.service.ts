import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-interface';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { Review } from 'src/app/courses/models/review.interface';
import { Course } from 'src/app/courses/models/course.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

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

  showUserReviews(userId: number): Observable<Review[]> {
    const userReviewsURL = `http://localhost:3000/reviews?userId=${userId}`;
    return this.http.get<Review[]>(userReviewsURL);
  }
}
