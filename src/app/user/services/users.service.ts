import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-interface';
import { Observable, switchMap } from 'rxjs';
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
    cardFunds: number,
    cardName: string,
    userId: number
  ): Observable<User> {
    const usersURL = `http://localhost:3000/users/${userId}`;
    const payment = {
      cardNumber,
      cardYear,
      cardMonth,
      cardCvv,
      cardFunds,
      cardName,
    };
    const body = {
      payment: payment,
    };

    return this.http.patch<User>(usersURL, body);
  }

  saveAddress(address: string, userId: number): Observable<any> {
    const usersURL = `http://localhost:3000/users/${userId}`;
    const body = { billingAddress: address };
    return this.http.patch<any>(usersURL, body);
  }

  deleteAddress(userId: number): Observable<any> {
    const usersURL = `http://localhost:3000/users/${userId}`;
    const body = { billingAddress: '' };
    return this.http.patch<any>(usersURL, body);
  }

  depositMoney(
    userId: number,
    amount: number,
    previousAmount: number,
    funds: number,
    paymentInfo: Payment
  ): Observable<User> {
    const usersURL = `http://localhost:3000/users/${userId}`;

    const newAmount = amount + previousAmount;
    const newFunds = funds - amount;
    const body = {
      wallet: newAmount,
      payment: {
        ...paymentInfo,
        cardFunds: newFunds,
      },
    };
    return this.http.patch<User>(usersURL, body);
  }
}
