import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.interface';
import { ReviewsService } from '../../services/reviews.service';
import { CoursesService } from '../../services/courses.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-course-grid-card',
  templateUrl: './course-grid-card.component.html',
  styleUrls: ['./course-grid-card.component.scss'],
})
export class CourseGridCardComponent {
  @Input() course!: Course;
  addedToWishlist: boolean = false;

  ngOnInit(): void {}

  constructor(
    private coursesService: CoursesService,
    private authService: AuthService
  ) {}

  addCourseToWishlist() {
    if (this.authService.loggedUser) {
      this.coursesService
        .addToWishlist(this.authService.loggedUser.id, this.course.id)
        .subscribe(() => {
          this.addedToWishlist = true;
        });
    }
  }

  deleteCourseFromWishlist() {}
}
