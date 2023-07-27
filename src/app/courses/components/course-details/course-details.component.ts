import { AuthService } from './../../../auth/services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.interface';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  course!: Course;
  rating: number = 0;
  message!: string;
  userId!: number;
  emptyRatingError: boolean = false;
  emptyMessageError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private authService: AuthService,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.getCourse();
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
  addReview() {
    if (this.rating === 0) {
      this.emptyRatingError = true;
    }
    if (!this.message) {
      this.emptyMessageError = true;
    }
    this.userId = this.authService.loggedUser.id;
    this.reviewsService
      .addReview(this.message, this.rating, this.userId, this.course.id)
      .subscribe();
  }
}
