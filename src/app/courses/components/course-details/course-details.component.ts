import { ReviewsService } from './../../services/reviews.service';
import { AuthService } from './../../../auth/services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.interface';
import { Review } from '../../models/review.interface';
import { Instructor } from 'src/app/instructors/models/instructor-interface';
import { notifierService } from 'src/app/auth/services/notifier.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { InstructorsService } from 'src/app/instructors/services/instructors.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent {
  course!: Course;
  isCoursePurchased!: boolean;
  instructor!: Instructor;
  numberOfCourses!: number;

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
    private reviewsService: ReviewsService,
    private notifierService: notifierService,
    private cartService: CartService,
    private instructorsService: InstructorsService
  ) {}

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.coursesService.getCourseById(id).subscribe((course) => {
      this.course = course;
      this.authService.courseId = course.id;
      const userId = this.authService.getUserData()?.id;
      const purchasedCourses = this.authService.getUserData()?.purchasedCourses;
      if (userId) {
        if (purchasedCourses?.includes(this.course.id)) {
          this.isCoursePurchased = true;
        }
      }
      this.coursesService
        .getInstructorById(this.course.instructorId)
        .subscribe((instructor) => {
          this.instructor = instructor;
          this.instructorsService
            .getInstructorCourses(this.instructor.id)
            .subscribe((courses) => {
              this.numberOfCourses = courses.length;
            });
        });

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

  addCourseToCart() {
    const userId = this.authService.getUserData()?.id;
    const cartCourses = this.cartService.getCart() || [];
    if (userId) {
      if (cartCourses) {
        cartCourses.push(this.course.id);
        this.cartService.updateCart(cartCourses);
        this.isCoursePurchased = true;
        this.notifierService.showNotifications('Course added to cart');
      }
    } else {
      this.notifierService.showError('You must be logged');
    }
  }
}
