import { CreateCourseService } from './../../services/create-course.service';
import { Component, Input } from '@angular/core';
import { Topic } from '../../models/topic-interface';
import { Chapter } from '../../models/chapter-interface';

@Component({
  selector: 'app-course-topic',
  templateUrl: './course-topic.component.html',
  styleUrls: ['./course-topic.component.scss'],
})
export class CourseTopicComponent {
  isEditTopicInputShown: boolean = false;

  selectedTopicIndex!: number;
  editedTopicName!: string;

  newTopicIndex!: number;

  @Input() topic!: Topic;
  @Input() topicIndex!: number;
  @Input() chapter!: Chapter;

  constructor(private createCourseService: CreateCourseService) {}

  deleteTopic() {
    this.createCourseService.removeTopicFromChapter(
      this.chapter.id,
      this.topicIndex
    );
  }

  editTopic(topicName: string, topicIndex: number) {
    this.isEditTopicInputShown = true;
    this.selectedTopicIndex = topicIndex;
    this.editedTopicName = topicName;
    this.newTopicIndex = topicIndex;
  }

  saveEditedTopic(topicIndex: number) {
    const topicName = this.editedTopicName;

    this.createCourseService.saveEditedTopic(
      topicName,
      this.chapter.id,
      topicIndex
    );
    this.editedTopicName = '';
    this.isEditTopicInputShown = false;
  }
}
