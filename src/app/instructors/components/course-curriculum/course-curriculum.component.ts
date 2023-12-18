import { Chapter } from '../../models/chapter-interface';
import { Component } from '@angular/core';
import { InstructorsService } from '../../services/instructors.service';
import { CreateCourseService } from '../../services/create-course.service';
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

  courseDetails!: any;
  courseMedia!: string;

  chapterIndex: number = 0;
  topicIndex: number = 0;
  newTopicIndex!: number;
  selectedChapterIndex!: number;
  selectedTopicIndex!: number;

  curriculum!: Chapter[];

  constructor(private createCourseService: CreateCourseService) {}

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
    this.courseDetails = this.createCourseService.courseDetails;
    this.courseMedia = this.createCourseService.courseMedia;
    if (this.courseDetails && this.courseMedia && this.curriculum) {
      this.createCourseService
        .saveCourse(this.courseDetails, this.courseMedia, this.curriculum)
        .subscribe();
    }
  }

  deleteTopic(chapterIndex: number, topicIndex: number) {
    if (this.curriculum[chapterIndex].topics) {
      this.curriculum[chapterIndex].topics.splice(topicIndex, 1);
      console.log(this.curriculum);
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

    // this.createCourseService.addTopicToChapter(
    //   chapterIndex,
    //   topicName,
    //   this.topicIndex
    // );
    this.editedTopicName = '';
    this.isEditTopicInputShown = false;
  }
}
