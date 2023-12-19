import { Component, Input } from '@angular/core';
import { Chapter } from '../../models/chapter-interface';

@Component({
  selector: 'app-course-chapter',
  templateUrl: './course-chapter.component.html',
  styleUrls: ['./course-chapter.component.scss'],
})
export class CourseChapterComponent {
  @Input() chapter!: Chapter;
  @Input() index!: number;
}
