import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartTotalComponent } from './components/cart-total/cart-total.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartRoutingModule } from './cart-routing.module';
import { CheckoutDetailsComponent } from './components/checkout-details/checkout-details.component';
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrderProductComponent } from './components/order-product/order-product.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';

@NgModule({
  declarations: [
    CartListComponent,
    CartProductComponent,
    CartTotalComponent,
    CheckoutComponent,
    CheckoutDetailsComponent,
    CheckoutPaymentComponent,
    OrderSummaryComponent,
    OrderProductComponent,
  ],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
