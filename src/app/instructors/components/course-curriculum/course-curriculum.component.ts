import { Chapter } from '../../models/chapter-interface';
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
  isTopicEdited: boolean = false;
  isEditTopicInputShown: boolean = false;

  chapterName: string = '';
  topicName: string = '';

  courseDetails!: any;
  courseMedia!: string;

  chapterIndex: number = 0;
  topicIndex: number = 0;
  newTopicIndex!: number;
  selectedChapterIndex!: number;

  curriculum!: Chapter[];

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
    this.isChapterInputShown = false;
    this.chapterName = '';
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
    this.isTopicInputShown = false;
  }

  saveCourse() {
    this.courseDetails = this.instructorsService.courseDetails;
    this.courseMedia = this.instructorsService.courseMedia;
    if (this.courseDetails && this.courseMedia && this.curriculum) {
      this.instructorsService
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
    this.isTopicEdited = true;
    this.topicName = topicName;
    this.newTopicIndex = topicIndex;
  }
}
