import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { notifierService } from 'src/app/auth/services/notifier.service';
import { Course } from 'src/app/courses/models/course.interface';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent {
  products: Course[] = [];
  cartTotal!: number;

  constructor(
    private authService: AuthService,
    private coursesService: CoursesService,
    private notifierService: notifierService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCartCourses();
  }

  getCartCourses() {
    const userCart = this.authService.getUserData()?.cart;
    console.log(userCart);
    if (userCart) {
      if (userCart.length > 0) {
        this.coursesService
          .getCoursesByIds(userCart)
          .subscribe((cartCourses) => {
            this.products = cartCourses;
            this.cartTotal = cartCourses.reduce(
              (total, course) => total + +course.price,
              0
            );
          });
      } else {
        this.products = [];
      }
    }
  }

  onDeleteCourse(deletedProduct: Course) {
    this.products = this.products.filter(
      (course) => course.id !== deletedProduct.id
    );
    this.cartTotal = this.products.reduce(
      (total, course) => total + +course.price,
      0
    );
  }

  placeOrder() {
    const userId = this.authService.getUserData()?.id;
    if (userId) {
      const walletValue = this.authService.getUserData()?.wallet;
      if (walletValue) {
        const newWalletValue = +walletValue - +this.cartTotal;
        if (newWalletValue > 0) {
          this.products = [];
          this.cartService
            .updateWalletValueAndCart(userId, newWalletValue, this.products)
            .subscribe((user) => {
              this.authService.updateUser(user);
              this.notifierService.showNotifications('Order placed');
              console.log(user);
              this.router.navigate(['/courses']);
            });
        } else {
          this.notifierService.showError('Insuficient money');
        }
      }
    }
  }
}
