import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.interface';

@Component({
  selector: 'app-course-grid-card',
  templateUrl: './course-grid-card.component.html',
  styleUrls: ['./course-grid-card.component.scss'],
})
export class CourseGridCardComponent {
  @Input() course!: Course;
}
