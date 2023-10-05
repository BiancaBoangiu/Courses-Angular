import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CartTotalComponent } from './components/cart-total/cart-total.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartRoutingModule } from './cart-routing.module';
import { CheckoutDetailsComponent } from './components/checkout-details/checkout-details.component';
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';

@NgModule({
  declarations: [
    CartListComponent,
    CartProductComponent,
    CartTotalComponent,
    CheckoutComponent,
    CheckoutDetailsComponent,
    CheckoutPaymentComponent,
  ],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
