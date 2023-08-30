import { Component, Input } from '@angular/core';
import { Course } from 'src/app/courses/models/course.interface';

@Component({
  selector: 'app-popular-course-card',
  templateUrl: './popular-course-card.component.html',
  styleUrls: ['./popular-course-card.component.scss'],
})
export class PopularCourseCardComponent {
  @Input() course!: Course;
}
