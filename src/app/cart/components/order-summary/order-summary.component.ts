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
    const userCart = this.cartService.getCart();

    if (userCart.length > 0) {
      this.coursesService.getCoursesByIds(userCart).subscribe((cartCourses) => {
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
    const billingAddress = this.authService.getUserData()?.billingAddress;
    const cardDetails = this.authService.getUserData()?.payment;
    if (!billingAddress || !cardDetails) {
      this.notifierService.showError('All fields must be completed');
    } else {
      const userId = this.authService.getUserData()?.id;
      const cart = this.cartService.getCart();
      const purchasedCourses =
        this.authService.getUserData()?.purchasedCourses || [];

      if (userId) {
        const walletValue = this.authService.getUserData()?.wallet || 0;
        if (walletValue) {
          const newWalletValue = +walletValue - +this.cartTotal;
          if (newWalletValue > 0) {
            this.cartService
              .savePurchasedCourses(purchasedCourses, cart, userId)
              .subscribe((user) => {
                this.authService.updateUser(user);
                this.cartService
                  .updateWalletValue(userId, newWalletValue)
                  .subscribe((user) => {
                    this.authService.updateUser(user);

                    this.products.forEach((product) => {
                      const participants = product.participants || [];
                      this.cartService
                        .addUserAsParticipant(user.id, product.id, participants)
                        .subscribe(() => {
                          this.cartService.updateCart([]);
                          this.notifierService.showNotifications(
                            'Order placed'
                          );
                          this.router.navigate(['/cart/order-placed']);
                        });
                    });
                  });
              });
          } else {
            this.notifierService.showError('Insuficient money');
          }
        } else {
          this.notifierService.showError('Empty wallet');
        }
      }
    }
  }
}
