import { ReviewsService } from './../../services/reviews.service';
import { AuthService } from './../../../auth/services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.interface';
import { Review } from '../../models/review.interface';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  course!: Course;

  fiveStars: number = 0;
  fourStars: number = 0;
  threeStars: number = 0;
  twoStars: number = 0;
  oneStar: number = 0;
  total: number = 0;

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
        .subscribe((updatedCourse) => {
          this.course.views = updatedCourse.views;
        });

      this.reviewsService.showCourseReviews().subscribe((reviews) => {
        this.showReviewsRatings(reviews);
      });
    });
  }

  showAverageRating(averageRating: number) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.coursesService
      .updateAverageRating(id, averageRating)
      .subscribe((response) => {
        this.course = response;
      });
  }

  showReviewsRatings(reviews: Review[]) {
    this.fiveStars = 0;
    this.fourStars = 0;
    this.threeStars = 0;
    this.twoStars = 0;
    this.oneStar = 0;
    reviews.map((review) => {
      if (Number(review.rating) === 5) {
        this.fiveStars++;
      }
      if (Number(review.rating) === 4) {
        this.fourStars++;
      }
      if (Number(review.rating) === 3) {
        this.threeStars++;
      }
      if (Number(review.rating) === 2) {
        this.twoStars++;
      }
      if (Number(review.rating) === 1) {
        this.oneStar++;
      }
    });

    this.total =
      this.fiveStars +
      this.fourStars +
      this.threeStars +
      this.twoStars +
      this.oneStar;
  }
}
