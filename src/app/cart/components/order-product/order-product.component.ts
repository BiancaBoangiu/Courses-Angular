import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Course } from 'src/app/courses/models/course.interface';
import { CoursesService } from 'src/app/courses/services/courses.service';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss'],
})
export class OrderProductComponent {
  @Input() product!: Course;
  @Output() onDeleteCourse = new EventEmitter<Course>();

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService
  ) {}

  removeProductFromCart() {
    const userId = this.authService.getUserData()?.id;
    if (userId) {
      this.coursesService
        .deleteCourseFromCart(this.product.id, userId)
        .subscribe((user) => {
          this.authService.updateUser(user);
          this.onDeleteCourse.emit(this.product);
        });
    }
  }
}
