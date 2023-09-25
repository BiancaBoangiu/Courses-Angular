import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  paymentAdded: boolean = false;
  cardNumber!: number;
  cardYear!: number;
  cardMonth!: number;
  cardCvv!: number;
  cardName!: string;

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  saveCardInfo() {
    const userId = this.authService.getUserData()?.id as number;
    if (userId) {
      this.usersService
        .savePaymentInfo(
          this.cardNumber,
          this.cardYear,
          this.cardMonth,
          this.cardCvv,
          this.cardName,
          userId
        )
        .subscribe(() => {
          this.paymentAdded = true;
        });
    }
  }
}
