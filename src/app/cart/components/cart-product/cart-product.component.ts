import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Course } from 'src/app/courses/models/course.interface';
import { CoursesService } from 'src/app/courses/services/courses.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent {
  @Input() course!: Course;
  @Output() onDeleteCourse = new EventEmitter<Course>();

  constructor(
    private coursesService: CoursesService,
    private authService: AuthService
  ) {}

  deleteCourseFromCart() {
    const userId = this.authService.getUserData()?.id;
    if (userId) {
      this.coursesService
        .deleteCourseFromCart(this.course.id, userId)
        .subscribe((user) => {
          this.authService.updateUser(user);
          this.onDeleteCourse.emit(this.course);
        });
    }
  }
}
