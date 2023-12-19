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
  isChapterInputShown: boolean = false;
  isTopicInputShown: boolean = false;
  isEditTopicInputShown: boolean = false;

  chapterName: string = '';
  topicName: string = '';
  editedTopicName!: string;

  courseDetails!: courseDetails;
  courseMedia!: string;

  chapterIndex: number = 0;
  topicIndex: number = 0;
  newTopicIndex!: number;
  selectedChapterIndex!: number;
  selectedTopicIndex!: number;

  curriculum!: Chapter[];

  constructor(
    private createCourseService: CreateCourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.curriculum = this.createCourseService.chapters;
  }

  addLecture() {
    this.isChapterInputShown = !this.isChapterInputShown;
  }

  saveChapter() {
    this.createCourseService.addChapter(this.chapterName, this.chapterIndex);
    this.chapterIndex++;
    this.isChapterInputShown = false;
    this.chapterName = '';
  }

  showTopicInput(chapterIndex: number) {
    this.selectedChapterIndex = chapterIndex;
    this.isTopicInputShown = !this.isTopicInputShown;
  }

  saveTopic(chapterIndex: number) {
    const topicName = this.topicName;

    this.createCourseService.addTopicToChapter(
      chapterIndex,
      topicName,
      this.topicIndex
    );
    this.topicIndex++;
    this.topicName = '';
    this.isTopicInputShown = false;
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

  deleteTopic(chapterIndex: number, topicIndex: number) {
    if (this.curriculum[chapterIndex].topics) {
      this.curriculum[chapterIndex].topics.splice(topicIndex, 1);
      this.createCourseService.courseCurriculum$.next(this.curriculum);
    }
  }

  editTopic(topicName: string, topicIndex: number) {
    this.isEditTopicInputShown = true;
    this.selectedTopicIndex = topicIndex;
    this.editedTopicName = topicName;
    this.newTopicIndex = topicIndex;
  }

  saveEditedTopic(chapterIndex: number, topicIndex: number) {
    const topicName = this.editedTopicName;
    this.curriculum[chapterIndex].topics[topicIndex].topicName = topicName;
    this.createCourseService.courseCurriculum$.next(this.curriculum);

    this.editedTopicName = '';
    this.isEditTopicInputShown = false;
  }
}
