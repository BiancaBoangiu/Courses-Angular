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
  chapters!: { chapterName: string; topics: string[] }[];

  constructor(private instructorsService: InstructorsService) {}

  ngOnInit() {
    this.chapters = this.instructorsService.chapters;
  }

  addLecture() {
    this.isChapterInputShown = !this.isChapterInputShown;
  }

  saveChapter() {
    console.log(this.chapterName);
    this.instructorsService.addChapter(this.chapterName);
  }

  showTopicInput() {
    this.isTopicInputShown = !this.isTopicInputShown;
  }

  addTopic(chapterIndex: number) {
    const topicName = this.topicName;
    this.instructorsService.addTopicToChapter(chapterIndex, topicName);
  }
}
