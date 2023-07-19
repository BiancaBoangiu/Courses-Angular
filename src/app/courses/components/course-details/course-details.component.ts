import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.interface';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  course!: Course;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.coursesService.getCourseById(id).subscribe((course) => {
      this.course = course;

      this.coursesService
        .updateCourseViewcount(id, this.course.views + 1)
        .subscribe(
          (updatedCourse) => (this.course.views = updatedCourse.views)
        );
    });
  }
}
