import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../course';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}
  private coursesURL = 'http://localhost:3000/courses';
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesURL);
  }
}
