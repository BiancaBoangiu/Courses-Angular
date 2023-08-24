import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../models/instructor-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InstructorsService {
  private instructorsURL = 'http://localhost:3000/instructors';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.instructorsURL);
  }
}
