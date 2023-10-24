import { Component, Input } from '@angular/core';
import { Course } from 'src/app/courses/models/course.interface';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  @Input() course!: Course;
}
