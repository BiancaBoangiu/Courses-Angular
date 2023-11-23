import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Course } from 'src/app/courses/models/course.interface';
import { CoursesService } from 'src/app/courses/services/courses.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent {
  wishlistCourses: Course[] = [];

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.getWishlist();
  }

  getWishlist() {
    this.authService.loggedUser$
      .pipe(filter((value) => value !== null))
      .subscribe((user) => {
        if (user) {
          if (user.wishlist && user.wishlist.length >= 1) {
            this.coursesService
              .getCoursesByIds(user.wishlist)
              .subscribe((wishlistCourses) => {
                this.wishlistCourses = wishlistCourses;
              });
          }
        }
      });
  }

  showUpdatedCourses(courseId: number) {
    this.wishlistCourses = this.wishlistCourses.filter((course) => {
      return course.id !== courseId;
    });
  }
}
