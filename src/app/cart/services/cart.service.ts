import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { Auth } from 'src/app/auth/models/auth.interface';
import { Course } from 'src/app/courses/models/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor(private http: HttpClient) {}

  updateCart(data: number[]) {
    this.cart$.next(data);
  }

  getCart(): number[] {
    return this.cart$.getValue();
  }

  saveBillingDetails(
    userId: number,
    name: string,
    phoneNumber: number,
    country: string,
    city: string,
    postalCode: number,
    address: string
  ): Observable<Auth> {
    const userURL = `http://localhost:3000/users/${userId}`;
    const details = {
      name,
      phoneNumber,
      country,
      city,
      postalCode,
      address,
    };
    const body = { billing: details };
    return this.http.patch<Auth>(userURL, body);
  }

  updateWalletValue(userId: number, wallet: number): Observable<Auth> {
    const userURL = `http://localhost:3000/users/${userId}`;
    const body = { wallet };
    return this.http.patch<Auth>(userURL, body);
  }

  savePurchasedCourses(
    purchasedCourses: number[],
    cartCourses: number[],
    userId: number
  ): Observable<Auth> {
    const userURL = `http://localhost:3000/users/${userId}`;

    purchasedCourses.push(...cartCourses);

    const body = {
      purchasedCourses: purchasedCourses,
    };
    return this.http.patch<Auth>(userURL, body);
  }

  addUserAsParticipant(
    userId: number,
    courseId: number,
    courseParticipants: number[]
  ): Observable<Course> {
    const courseURL = `http://localhost:3000/courses/${courseId}`;
    const participants = courseParticipants || [];
    courseParticipants.push(userId);
    const body = { participants: participants };
    return this.http.patch<Course>(courseURL, body);
  }
}
