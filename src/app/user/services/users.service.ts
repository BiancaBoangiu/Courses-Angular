import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Review } from 'src/app/courses/models/review.interface';
import { Course } from 'src/app/courses/models/course.interface';
import { Payment } from '../models/payment-interface';
import { ToastrService } from 'ngx-toastr';
import { Auth } from 'src/app/auth/models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  updateUserInfo(
    firstName: string,
    lastName: string,
    description: string,
    education: string,
    id: number
  ): Observable<Auth> {
    const userURL = `http://localhost:3000/users/${id}`;
    const body = { firstName, lastName, description, education };
    return this.http.patch<Auth>(userURL, body);
  }

  updateNewPassword(newPassword: string, userId: number): Observable<Auth> {
    const userURL = `http://localhost:3000/users/${userId}`;
    const body = { password: newPassword };

    return this.http.patch<Auth>(userURL, body);
  }
  updateNewProfileImage(
    newProfileImage: string,
    userId: number
  ): Observable<Auth> {
    const userURL = `http://localhost:3000/users/${userId}`;
    const body = { image: newProfileImage };

    return this.http.patch<Auth>(userURL, body);
  }

  deleteUserAccount(userId: number): Observable<Auth> {
    const userURL = `http://localhost:3000/users/${userId}`;
    return this.http.delete<Auth>(userURL);
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
  ): Observable<Auth> {
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

    return this.http.patch<Auth>(usersURL, body);
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
  ): Observable<Auth> {
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
    return this.http.patch<Auth>(usersURL, body);
  }

  saveSettings(
    userId: number,
    profileVisibility: boolean,
    emailNotifications: boolean,
    smsConfirmation: boolean,
    hideNotifications: boolean
  ): Observable<Auth> {
    const usersURL = `http://localhost:3000/users/${userId}`;
    const body = {
      profileVisibility,
      emailNotifications,
      smsConfirmation,
      hideNotifications,
    };
    return this.http.patch<Auth>(usersURL, body);
  }

  showToastrMessage(message: string): void {
    this.toastr.success(message);
  }
}
