import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.interface';
import { ReviewsService } from '../../services/reviews.service';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/user/models/user-interface';

@Component({
  selector: 'app-course-grid-card',
  templateUrl: './course-grid-card.component.html',
  styleUrls: ['./course-grid-card.component.scss'],
})
export class CourseGridCardComponent {
  @Input() course!: Course;
  addedToWishlist: boolean = false;

  user!: User;

  ngOnInit(): void {
    this.getUser();
  }

  constructor(
    private coursesService: CoursesService,
    private authService: AuthService
  ) {}

  getUser() {
    const userId = this.authService.loggedUser.id;
    this.authService.getUserById(userId).subscribe((user) => {
      this.user = user;
      this.addedToWishlist = user.wishlist.includes(this.course.id);
    });
  }

  addCourseToWishlist() {
    if (this.authService.loggedUser) {
      const userId = this.authService.loggedUser.id;

      this.authService.getUserById(userId).subscribe((user) => {
        this.coursesService
          .addToWishlist(this.course.id, user.id, user)
          .subscribe(() => {
            this.addedToWishlist = !this.addedToWishlist;
          });
      });
    }
  }

  deleteCourseFromWishlist() {
    if (this.authService.loggedUser) {
      const userId = this.authService.loggedUser.id;

      this.authService.getUserById(userId).subscribe((user) => {
        this.coursesService
          .deleteFromWishlist(this.course.id, user, user.id)
          .subscribe(() => {
            this.addedToWishlist = !this.addedToWishlist;
          });
      });
    }
  }
}
