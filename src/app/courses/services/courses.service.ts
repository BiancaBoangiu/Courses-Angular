import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.interface';
import { InstructorsService } from 'src/app/instructors/services/instructors.service';
import { Instructor } from 'src/app/instructors/models/instructor-interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private coursesURL = 'http://localhost:3000/courses';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private instructorsService: InstructorsService
  ) {}

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

  getCoursesByExperience(level: string): Observable<Course[]> {
    const coursesByLevel = `http://localhost:3000/courses?experience=${level}`;
    console.log(coursesByLevel);
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
    console.log(courses);
    return this.http.get<Course[]>(courses);
  }

  getInstructorById(id: number): Observable<Instructor> {
    const instructorURL = `http://localhost:3000/instructors/${id}`;
    return this.http.get<Instructor>(instructorURL);
  }
}
