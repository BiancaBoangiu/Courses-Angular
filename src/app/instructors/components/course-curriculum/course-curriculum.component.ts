import { Component } from '@angular/core';
import { InstructorsService } from '../../services/instructors.service';

@Component({
  selector: 'app-course-curriculum',
  templateUrl: './course-curriculum.component.html',
  styleUrls: ['./course-curriculum.component.scss'],
})
export class CourseCurriculumComponent {
  isChapterInputShown: boolean = false;
  chapterName!: string;
  chapters: string[] = [];

  constructor(private instructorsService: InstructorsService) {}

  addLecture() {
    this.isChapterInputShown = !this.isChapterInputShown;
  }

  saveChapter() {
    console.log(this.chapterName);
    this.chapters.push(this.chapterName);
    this.instructorsService.courseChapters = this.chapters;
  }
}
