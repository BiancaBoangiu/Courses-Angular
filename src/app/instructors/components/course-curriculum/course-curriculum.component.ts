import { Component } from '@angular/core';

@Component({
  selector: 'app-course-curriculum',
  templateUrl: './course-curriculum.component.html',
  styleUrls: ['./course-curriculum.component.scss'],
})
export class CourseCurriculumComponent {
  isChapterInputShown: boolean = false;
  chapterName!: string;

  addLecture() {
    this.isChapterInputShown = !this.isChapterInputShown;
  }
}
