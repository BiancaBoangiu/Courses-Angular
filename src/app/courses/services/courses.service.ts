import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.interface';
import { Instructor } from 'src/app/instructors/models/instructor-interface';
import { Auth } from 'src/app/auth/models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private coursesURL = 'http://localhost:3000/courses';
  private wishlistURL = 'http://localhost:3000/wishlist';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesURL);
  }

  getCoursesByIds(ids: number[]): Observable<Course[]> {
    let httpParams = new HttpParams();

    ids.forEach((id) => {
      httpParams = httpParams.append('id', id);
    });
    return this.http.get<Course[]>(this.coursesURL, { params: httpParams });
  }

  getCourseById(id: number): Observable<Course> {
    const url = `${this.coursesURL}/${id}`;
    return this.http.get<Course>(url);
  }

  updateCourseViewcount(id: number, views: number): Observable<Course> {
    const url = `${this.coursesURL}/${id}`;
    const body = { views: views };
    return this.http.patch<Course>(url, body, this.httpOptions);
  }

  updateAverageRating(
    courseId: number,
    averageRating: number
  ): Observable<Course> {
    const body = { rating: averageRating };
    return this.http.patch<Course>(
      `http://localhost:3000/courses/${courseId}`,
      body
    );
  }

  getCoursesByExperience(level: string): Observable<Course[]> {
    const coursesByLevel = `http://localhost:3000/courses?experience=${level}`;
    return this.http.get<Course[]>(coursesByLevel);
  }

  getCoursesByPrice(price: string): Observable<Course[]> {
    const coursesByFreePrice = 'http://localhost:3000/courses?isPremium=false';
    const courses = 'http://localhost:3000/courses';
    const coursesByPremiumPrice =
      'http://localhost:3000/courses?isPremium=true';
    if (price === 'Premium') {
      return this.http.get<Course[]>(coursesByPremiumPrice);
    } else if (price === 'Free') {
      return this.http.get<Course[]>(coursesByFreePrice);
    } else {
      return this.http.get<Course[]>(courses);
    }
  }

  getCoursesByOption(option: string): Observable<Course[]> {
    const optionParts = option.split('_');
    const courses = `http://localhost:3000/courses?_sort=${optionParts[0]}&_order=${optionParts[1]}`;
    return this.http.get<Course[]>(courses);
  }

  getInstructorById(id: number): Observable<Instructor> {
    const instructorURL = `http://localhost:3000/instructors/${id}`;
    return this.http.get<Instructor>(instructorURL);
  }

  addToWishlist(courseId: number, userId: number, user: Auth): Observable<any> {
    const userURL = `http://localhost:3000/users/${userId}`;

    const wishlistCourses = user.wishlist || [];

    if (!wishlistCourses.includes(courseId)) {
      wishlistCourses.push(courseId);
    } else {
      const index = wishlistCourses.indexOf(courseId);
      wishlistCourses.splice(index, 1);
    }

    const wishlistData = { wishlist: wishlistCourses };

    return this.http.patch<any>(userURL, wishlistData);
  }

  deleteFromWishlist(
    courseId: number,
    user: Auth,
    userId: number
  ): Observable<any> {
    const userURL = `http://localhost:3000/users/${userId}`;
    const wishlistCourses = user.wishlist || [];

    if (wishlistCourses.includes(courseId)) {
      const index = wishlistCourses.indexOf(courseId);
      wishlistCourses.splice(index, 1);
    }

    const wishlistData = { wishlist: wishlistCourses };

    return this.http.patch<any>(userURL, wishlistData);
  }

  addCourseToCart(
    course: Course,
    courseId: number,
    userId: number
  ): Observable<Auth> {
    const usersURL = `http://localhost:3000/users/${userId}`;

    const courses = course.cart || [];
    console.log(courses);

    if (courses.includes(courseId)) {
      courses.push(courseId);
    } else {
      const index = courses.indexOf(courseId);
      courses.splice(index, 1);
    }
    console.log(courses);
    const body = { cart: courses };

    return this.http.patch<Auth>(usersURL, body);
  }
}
