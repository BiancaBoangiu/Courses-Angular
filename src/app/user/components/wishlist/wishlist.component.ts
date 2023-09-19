import { Component } from '@angular/core';
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
    const wishlist = this.authService.getUserData()?.wishlist;
    wishlist?.map((courseId) =>
      this.coursesService.getCourseById(courseId).subscribe((course) => {
        this.wishlistCourses.push(course);
      })
    );
  }

  showUpdatedCourses(data: Course[]) {
    this.wishlistCourses = data;
  }
}
