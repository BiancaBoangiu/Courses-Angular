import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartTotalComponent } from './components/cart-total/cart-total.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartRoutingModule } from './cart-routing.module';
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrderProductComponent } from './components/order-product/order-product.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutBillingDetailsComponent } from './components/checkout-billing-details/checkout-billing-details.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    CartListComponent,
    CartProductComponent,
    CartTotalComponent,
    CheckoutComponent,
    CheckoutPaymentComponent,
    OrderSummaryComponent,
    OrderProductComponent,
    CheckoutBillingDetailsComponent,
    OrderPlacedComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
  ],
})
export class CartModule {}
