import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Course } from '../models/course.interface';
import { Review } from '../models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private coursesURL = 'http://localhost:3000/courses';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesURL);
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
}
