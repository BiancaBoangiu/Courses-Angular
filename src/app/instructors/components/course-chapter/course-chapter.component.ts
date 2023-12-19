import { Component, Input } from '@angular/core';
import { Chapter } from '../../models/chapter-interface';
import { CreateCourseService } from '../../services/create-course.service';
import { Router } from '@angular/router';
import { courseDetails } from '../../models/course-details-interface';

@Component({
  selector: 'app-course-chapter',
  templateUrl: './course-chapter.component.html',
  styleUrls: ['./course-chapter.component.scss'],
})
export class CourseChapterComponent {
  @Input() chapter!: Chapter;
  @Input() i!: number;
  @Input() chapterName!: string;

  isEditTopicInputShown: boolean = false;
  selectedTopicIndex!: number;
  editedTopicName!: string;

  isTopicInputShown: boolean = false;

  topicName: string = '';

  chapterIndex: number = 0;
  topicIndex: number = 0;
  newTopicIndex!: number;
  selectedChapterIndex!: number;

  curriculum!: Chapter[];

  constructor(
    private createCourseService: CreateCourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.curriculum = this.createCourseService.chapters;
  }

  saveChapter() {
    this.createCourseService.addChapter(this.chapterName, this.chapterIndex);
    this.chapterIndex++;
    // this.isChapterInputShown = false;
    this.chapterName = '';
  }

  showTopicInput(chapterIndex: number) {
    this.selectedChapterIndex = chapterIndex;
    this.isTopicInputShown = !this.isTopicInputShown;
  }

  deleteTopic(chapterIndex: number, topicIndex: number) {
    if (this.curriculum[chapterIndex].topics) {
      this.curriculum[chapterIndex].topics.splice(topicIndex, 1);
      this.createCourseService.courseCurriculum$.next(this.curriculum);
    }
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
