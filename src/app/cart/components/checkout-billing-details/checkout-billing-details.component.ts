import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { notifierService } from 'src/app/auth/services/notifier.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-billing-details',
  templateUrl: './checkout-billing-details.component.html',
  styleUrls: ['./checkout-billing-details.component.scss'],
})
export class CheckoutBillingDetailsComponent {
  billingAddress!: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const address = this.authService.getUserData()?.billingAddress;
    console.log(this.authService.getUserData());

    if (address) {
      this.billingAddress = address;
    }
  }
}
