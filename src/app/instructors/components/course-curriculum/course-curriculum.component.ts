import { Curriculum } from './../../models/curriculum-interface';
import { Component } from '@angular/core';
import { InstructorsService } from '../../services/instructors.service';
@Component({
  selector: 'app-course-curriculum',
  templateUrl: './course-curriculum.component.html',
  styleUrls: ['./course-curriculum.component.scss'],
})
export class CourseCurriculumComponent {
  isChapterInputShown: boolean = false;
  isTopicInputShown: boolean = false;

  chapterName: string = '';
  topicName: string = '';

  courseDetails!: any;
  courseMedia!: string;

  chapterIndex: number = 0;
  topicIndex: number = 0;
  selectedChapterIndex!: number;

  curriculum!: Curriculum[];

  constructor(private instructorsService: InstructorsService) {}

  ngOnInit() {
    this.curriculum = this.instructorsService.chapters;
  }

  addLecture() {
    this.isChapterInputShown = !this.isChapterInputShown;
  }

  saveChapter() {
    this.instructorsService.addChapter(this.chapterName, this.chapterIndex);
    this.chapterIndex++;
    this.chapterName = '';
    console.log(this.curriculum);
  }

  showTopicInput(chapterIndex: number) {
    this.selectedChapterIndex = chapterIndex;
    this.isTopicInputShown = !this.isTopicInputShown;
  }

  saveTopic(chapterIndex: number) {
    const topicName = this.topicName;
    this.instructorsService.addTopicToChapter(
      chapterIndex,
      topicName,
      this.topicIndex
    );
    this.topicIndex++;
    this.topicName = '';
  }

  saveCourse() {
    this.courseDetails = this.instructorsService.courseDetails;
    this.courseMedia = this.instructorsService.courseMedia;
    console.log(this.courseDetails, this.courseMedia, this.curriculum);
    if (this.courseDetails && this.courseMedia && this.curriculum) {
      this.instructorsService
        .saveCourse(this.courseDetails, this.courseMedia, this.curriculum)
        .subscribe();
    }
  }
}
