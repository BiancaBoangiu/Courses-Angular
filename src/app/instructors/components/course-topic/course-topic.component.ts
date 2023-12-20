import { Component, Input } from '@angular/core';
import { Chapter } from '../../models/chapter-interface';
import { CreateCourseService } from '../../services/create-course.service';
import { Router } from '@angular/router';
import { Topic } from '../../models/topic-interface';

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
  curriculum!: Chapter[];

  @Input() topic!: Topic;
  @Input() j!: number;
  @Input() i!: number;

  constructor(
    private createCourseService: CreateCourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.curriculum = this.createCourseService.chapters;
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
