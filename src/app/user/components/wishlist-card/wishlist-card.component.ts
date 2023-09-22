import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Course } from 'src/app/courses/models/course.interface';
import { CoursesService } from 'src/app/courses/services/courses.service';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.scss'],
})
export class WishlistCardComponent {
  @Input() course!: Course;
  wishlistCourses: Course[] = [];
  @Output() wishlistCoursesUpdated = new EventEmitter<Course[]>();

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService
  ) {}

  deleteCourseFromWishlist() {
    if (this.authService.getUserData()) {
      const user = this.authService.getUserData();
      const userId = this.authService.getUserData()?.id as number;

      if (user) {
        this.coursesService
          .deleteFromWishlist(this.course.id, user, userId)
          .subscribe(() => {
            const wishlist = this.authService.getUserData()?.wishlist;
            wishlist?.map((courseId) =>
              this.coursesService
                .getCourseById(courseId)
                .subscribe((course) => {
                  this.wishlistCourses.push(course);
                  console.log(this.wishlistCourses);
                  this.wishlistCoursesUpdated.emit(this.wishlistCourses);
                })
            );
          });
      }
    }
  }
}
