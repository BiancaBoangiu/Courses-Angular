import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';

const routes: Routes = [
  { path: '', component: CartListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-placed', component: OrderPlacedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
