import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../models/instructor-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from 'src/app/courses/models/course.interface';

@Injectable({
  providedIn: 'root',
})
export class InstructorsService {
  private instructorsURL = 'http://localhost:3000/instructors';
  // private coursesURL = `http://localhost:3000/courses?instructorId=${id}`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.instructorsURL);
  }

  getInstructorById(id: number): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.instructorsURL}/${id}`);
  }

  getInstructorCourses(id: number): Observable<Course[]> {
    const coursesURL = `http://localhost:3000/courses?instructorId=${id}`;
    return this.http.get<Course[]>(coursesURL);
  }
}
