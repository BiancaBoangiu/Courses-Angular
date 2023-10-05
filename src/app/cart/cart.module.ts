import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CartTotalComponent } from './components/cart-total/cart-total.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [
    CartListComponent,
    CartProductComponent,
    CartTotalComponent,
    CheckoutComponent,
  ],
  imports: [CommonModule, CartRoutingModule],
})
export class CartModule {}
