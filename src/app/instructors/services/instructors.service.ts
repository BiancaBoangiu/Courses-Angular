import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../models/instructor-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from 'src/app/courses/models/course.interface';
import { Curriculum } from '../models/curriculum-interface';
import { Chapter } from '../models/chapter-interface';
import { Topic } from '../models/topic-interface';

@Injectable({
  providedIn: 'root',
})
export class InstructorsService {
  instructorEmail!: string;
  instructorPassword!: string;
  courseDetails!: any;
  courseMedia!: string;
  courseTopics!: any;
  chapters: Curriculum[] = [];

  private instructorsURL = 'http://localhost:3000/instructors';

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

  registerInstructor(
    email: string,
    password: string,
    name: string,
    skills: string,
    education: string,
    address: string,
    phoneNumber: number,
    description: string,
    image: string
  ): Observable<Instructor> {
    const body = {
      email,
      password,
      name,
      skills,
      education,
      address,
      phoneNumber,
      description,
      image,
    };

    return this.http.post<Instructor>(this.instructorsURL, body);
  }

  verifyUser(loginEmail: string): Observable<Instructor[]> {
    const instructorURL = `http://localhost:3000/instructors?email=${loginEmail}`;
    return this.http.get<Instructor[]>(instructorURL);
  }

  addChapter(chapterName: string, id: number) {
    const chapter: Curriculum = { chapterName, id, topics: [] };
    this.chapters.push(chapter);
    console.log(this.chapters);
  }

  addTopicToChapter(chapterIndex: number, topicName: string, id: number) {
    const topic: Topic = { topicName, id };
    this.chapters[chapterIndex].topics.push(topic);
  }

  saveCourse(
    courseDetails: any,
    courseMedia: string,
    courseCurriculum: Curriculum[]
  ): Observable<Course> {
    const coursesURL = 'http://localhost:3000/courses';

    const body = {
      curriculum: courseCurriculum,
      image: courseMedia,
      description: courseDetails.description,
      title: courseDetails.title,
      category: courseDetails.category,
      level: courseDetails.level,
      time: courseDetails.time,
      premium: courseDetails.premium,
      certificate: courseDetails.certificate,
      price: courseDetails.price,
    };

    return this.http.post<Course>(coursesURL, body);
  }
}
