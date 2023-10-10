import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Payment } from 'src/app/user/models/payment-interface';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent {
  cardNumber!: number;
  cardYear!: number;
  cardMonth!: number;
  cardCvv!: number;
  cardName!: string;
  paymentInfo!: Payment;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const paymentInfo = this.authService.getUserData()?.payment;

    if (paymentInfo) {
      this.paymentInfo = paymentInfo;
      this.cardNumber = paymentInfo?.cardNumber;
      this.cardYear = paymentInfo?.cardYear;
      this.cardMonth = paymentInfo?.cardMonth;
      this.cardCvv = paymentInfo?.cardCvv;
      this.cardName = paymentInfo.cardName;
    }
  }
}
