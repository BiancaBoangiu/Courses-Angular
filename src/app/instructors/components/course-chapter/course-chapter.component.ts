import { Component, Input } from '@angular/core';
import { Chapter } from '../../models/chapter-interface';
import { CreateCourseService } from '../../services/create-course.service';

@Component({
  selector: 'app-course-chapter',
  templateUrl: './course-chapter.component.html',
  styleUrls: ['./course-chapter.component.scss'],
})
export class CourseChapterComponent {
  @Input() chapter!: Chapter;
  @Input() i!: number;
  @Input() isChapterInputShown!: boolean;

  selectedChapterIndex!: number;
  isTopicInputShown: boolean = false;
  topicName: string = '';
  topicIndex: number = 0;

  chapterName!: string;

  constructor(private createCourseService: CreateCourseService) {}

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
}
