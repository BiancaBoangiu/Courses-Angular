import { Component, Input } from '@angular/core';
import { CreateCourseService } from '../../services/create-course.service';
import { Router } from '@angular/router';
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

  deleteTopic(topicIndex: number) {
    if (this.chapter.topics) {
      this.chapter.topics.splice(topicIndex, 1);
    }
  }

  editTopic(topicName: string, topicIndex: number) {
    this.isEditTopicInputShown = true;
    this.selectedTopicIndex = topicIndex;
    this.editedTopicName = topicName;
    this.newTopicIndex = topicIndex;
  }

  saveEditedTopic(topicIndex: number) {
    const topicName = this.editedTopicName;

    this.chapter.topics[topicIndex].topicName = topicName;
    this.editedTopicName = '';
    this.isEditTopicInputShown = false;
  }
}
