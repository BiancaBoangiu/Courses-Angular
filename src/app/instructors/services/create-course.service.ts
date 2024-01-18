import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/courses/models/course.interface';
import { Topic } from '../models/topic-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chapter } from '../models/chapter-interface';
import { CourseDetails } from '../models/course-details-interface';

@Injectable({
  providedIn: 'root',
})
export class CreateCourseService {
  courseDetails$: BehaviorSubject<CourseDetails | null> =
    new BehaviorSubject<CourseDetails | null>(null);
  courseMedia$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  courseCurriculum$: BehaviorSubject<Chapter[]> = new BehaviorSubject<
    Chapter[]
  >([]);

  constructor(private http: HttpClient) {}

  getCourseDetails(): CourseDetails {
    return this.courseDetails$.getValue() as CourseDetails;
  }

  getCourseMedia(): string {
    return this.courseMedia$.getValue() as string;
  }

  getCourseCurriculum(): Chapter[] {
    return this.courseCurriculum$.getValue() as Chapter[];
  }

  addChapter(chapterName: string, id: number) {
    const chapter: Chapter = { chapterName, id, topics: [] };
    const chapters = this.courseCurriculum$.getValue() as Chapter[];
    chapters.push(chapter);
    this.courseCurriculum$.next(chapters);
  }

  addTopicToChapter(chapterIndex: number, topicName: string, id: number) {
    const topic: Topic = { topicName, id };
    const chapters = this.courseCurriculum$.getValue() as Chapter[];
    chapters[chapterIndex].topics.push(topic);
    this.courseCurriculum$.next(chapters);
  }

  removeTopicFromChapter(chapterIndex: number, topicIndex: number) {
    const chapters = this.courseCurriculum$.getValue() as Chapter[];
    const chapter = chapters[chapterIndex];
    if (chapter && chapter.topics) {
      chapter.topics.splice(topicIndex, 1);
      this.courseCurriculum$.next(chapters);
    }
  }

  saveEditedTopic(topicName: string, chapterIndex: number, topicIndex: number) {
    const chapters = this.courseCurriculum$.getValue() as Chapter[];
    const chapter = chapters[chapterIndex];
    if (chapter && chapter.topics) {
      chapter.topics[topicIndex].topicName = topicName;
      this.courseCurriculum$.next(chapters);
    }
  }

  saveCourse(
    courseDetails: CourseDetails,
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
