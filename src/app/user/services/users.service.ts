import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-interface';
import { Observable } from 'rxjs';
import { Review } from 'src/app/courses/models/review.interface';
import { Course } from 'src/app/courses/models/course.interface';
import { Payment } from '../models/payment-interface';

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

  savePaymentInfo(
    cardNumber: number,
    cardYear: number,
    cardMonth: number,
    cardCvv: number,
    cardName: string,
    userId: number
  ): Observable<Payment> {
    const usersURL = `http://localhost:3000/users/${userId}`;
    const payment = {
      cardNumber,
      cardYear,
      cardMonth,
      cardCvv,
      cardName,
    };
    const body = {
      payment: payment,
    };

    return this.http.patch<Payment>(usersURL, body);
  }

  saveAddress(address: string, userId: number): Observable<any> {
    const usersURL = `http://localhost:3000/users/${userId}`;
    const body = { address: address };
    return this.http.patch<any>(usersURL, body);
  }

  deleteAddress(userId: number): Observable<any> {
    const usersURL = `http://localhost:3000/users/${userId}`;
    const body = { address: '' };
    return this.http.patch<any>(usersURL, body);
  }
}
