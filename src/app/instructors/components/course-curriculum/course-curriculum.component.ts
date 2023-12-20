import { Chapter } from '../../models/chapter-interface';
import { Component } from '@angular/core';
import { CreateCourseService } from '../../services/create-course.service';
import { courseDetails } from '../../models/course-details-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-curriculum',
  templateUrl: './course-curriculum.component.html',
  styleUrls: ['./course-curriculum.component.scss'],
})
export class CourseCurriculumComponent {
  curriculum!: Chapter[];
  courseDetails!: courseDetails;
  courseMedia!: string;
  isChapterInputShown: boolean = false;
  chapterName: string = '';
  chapterIndex: number = 0;

  constructor(
    private createCourseService: CreateCourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.curriculum = this.createCourseService.chapters;
  }

  showChapterInput() {
    this.isChapterInputShown = !this.isChapterInputShown;
  }

  saveChapter() {
    this.createCourseService.addChapter(this.chapterName, this.chapterIndex);
    this.chapterIndex++;
    this.isChapterInputShown = false;
    this.chapterName = '';
  }

  saveCourse() {
    this.courseDetails = this.createCourseService.getCourseDetails();
    this.courseMedia = this.createCourseService.getCourseMedia();
    if (this.courseDetails && this.courseMedia && this.curriculum) {
      this.createCourseService
        .saveCourse(this.courseDetails, this.courseMedia, this.curriculum)
        .subscribe(() => {
          this.router.navigate(['/cart/order-placed']);
        });
    }
  }
}
