import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/courses/models/course.interface';
import { Topic } from '../models/topic-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chapter } from '../models/chapter-interface';
import { courseDetails } from '../models/course-details-interface';

@Injectable({
  providedIn: 'root',
})
export class CreateCourseService {
  chapters: Chapter[] = [];

  courseDetails$: BehaviorSubject<courseDetails | null> =
    new BehaviorSubject<courseDetails | null>(null);
  courseMedia$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  courseCurriculum$: BehaviorSubject<Chapter[] | null> = new BehaviorSubject<
    Chapter[] | null
  >(null);

  constructor(private http: HttpClient) {}

  getCourseDetails(): courseDetails {
    return this.courseDetails$.getValue() as courseDetails;
  }

  getCourseMedia(): string {
    return this.courseMedia$.getValue() as string;
  }

  getCourseCurriculum(): Chapter[] {
    return this.courseCurriculum$.getValue() as Chapter[];
  }

  addChapter(chapterName: string, id: number) {
    const chapter: Chapter = { chapterName, id, topics: [] };
    this.chapters.push(chapter);
    this.courseCurriculum$.next(this.chapters);
  }

  addTopicToChapter(chapterIndex: number, topicName: string, id: number) {
    const topic: Topic = { topicName, id };
    this.chapters[chapterIndex].topics.push(topic);
    this.courseCurriculum$.next(this.chapters);
  }

  saveCourse(
    courseDetails: courseDetails,
    courseMedia: string,
    courseCurriculum: Chapter[]
  ): Observable<Course> {
    const coursesURL = 'http://localhost:3000/courses';

    const body = {
      curriculum: courseCurriculum,
      image: courseMedia,
      description: courseDetails.description,
      name: courseDetails.name,
      category: courseDetails.category,
      experience: courseDetails.experience,
      time: courseDetails.time,
      premium: courseDetails.premium,
      certificate: courseDetails.certificate,
      price: courseDetails.price,
    };

    return this.http.post<Course>(coursesURL, body);
  }
}
