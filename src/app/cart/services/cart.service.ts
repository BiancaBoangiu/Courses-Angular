import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/models/auth.interface';
import { Course } from 'src/app/courses/models/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  savePersonalDetails(
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
    const body = { personalDetails: details };
    return this.http.patch<Auth>(userURL, body);
  }

  updateWalletValueAndCart(
    userId: number,
    wallet: number,
    cart: Course[]
  ): Observable<Auth> {
    const userURL = `http://localhost:3000/users/${userId}`;
    const body = { wallet, cart };
    return this.http.patch<Auth>(userURL, body);
  }
  deleteCoursesFromCart(userId: number, courseId: number) {}
}
