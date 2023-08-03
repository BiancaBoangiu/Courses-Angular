import { ReviewsService } from './../../services/reviews.service';
import { AuthService } from './../../../auth/services/auth.service';
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
  averageRating!: number;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private authService: AuthService,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.getCourse();
    this.showAverageRating();
  }

  getCourse(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.coursesService.getCourseById(id).subscribe((course) => {
      this.course = course;
      this.authService.courseId = course.id;

      this.coursesService
        .updateCourseViewcount(id, this.course.views + 1)
        .subscribe(
          (updatedCourse) => (this.course.views = updatedCourse.views)
        );
    });
  }
  showAverageRating(): void {
    this.reviewsService.showAverageRating().subscribe(() => {
      this.averageRating = this.reviewsService.averageRating;
    });
  }
}
