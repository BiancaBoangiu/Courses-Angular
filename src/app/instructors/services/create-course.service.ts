import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/courses/models/course.interface';
import { Topic } from '../models/topic-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chapter } from '../models/chapter-interface';

@Injectable({
  providedIn: 'root',
})
export class CreateCourseService {
  courseDetails!: any;
  courseMedia!: string;
  courseTopics!: any;
  chapters: Chapter[] = [];

  courseDetails$: BehaviorSubject<Course | null> =
    new BehaviorSubject<Course | null>(null);
  courseMedia$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  courseCurriculum: BehaviorSubject<Chapter | null> =
    new BehaviorSubject<Chapter | null>(null);

  constructor(private http: HttpClient) {}

  addChapter(chapterName: string, id: number) {
    const chapter: Chapter = { chapterName, id, topics: [] };
    this.chapters.push(chapter);
  }

  addTopicToChapter(chapterIndex: number, topicName: string, id: number) {
    const topic: Topic = { topicName, id };
    this.chapters[chapterIndex].topics.push(topic);
  }

  saveCourse(
    courseDetails: any,
    courseMedia: string,
    courseCurriculum: Chapter[]
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
