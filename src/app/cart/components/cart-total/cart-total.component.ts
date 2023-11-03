import { Component, Input } from '@angular/core';
import { Course } from 'src/app/courses/models/course.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss'],
})
export class CartTotalComponent {
  @Input() cartTotal!: number;
  productsInCart: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    const productsInCart = this.cartService.getCart();
    if (productsInCart && productsInCart.length > 0) {
      this.productsInCart = true;
    } else {
      this.productsInCart = false;
    }
  }
}
