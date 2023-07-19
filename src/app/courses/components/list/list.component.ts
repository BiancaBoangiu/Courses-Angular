import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  courses: Course[] = [];

  constructor(private courseService: CoursesService) {}

  ngOnInit() {
    this.courseService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }
}
