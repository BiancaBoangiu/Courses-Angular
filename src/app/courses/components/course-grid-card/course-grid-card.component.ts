import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.interface';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-course-grid-card',
  templateUrl: './course-grid-card.component.html',
  styleUrls: ['./course-grid-card.component.scss'],
})
export class CourseGridCardComponent {
  @Input() course!: Course;

  ngOnInit(): void {}

  constructor() {}
}
