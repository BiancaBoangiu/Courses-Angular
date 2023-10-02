import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Payment } from '../../models/payment-interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  paymentForm: FormGroup;
  address!: string;
  formSubmitted: boolean = false;
  depositAmount: number = 0;
  walletValue!: number;
  isFormEdited: boolean = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, this.cardNumberLengthValidator]],
      cardYear: ['', [Validators.required, this.yearValidator]],
      cardMonth: ['', [Validators.required, this.monthValidator]],
      cardCvv: ['', [Validators.required, this.cvvValidator]],
      cardFunds: ['', [Validators.required, this.fundsValidator]],
      cardName: ['', Validators.required],
    });
  }

  ngOnInit() {
    const paymentInfo = this.authService.getUserData()?.payment;
    const walletValue = this.authService.getUserData()?.wallet;
    if (paymentInfo) {
      this.formSubmitted = true;
      Object.keys(this.paymentForm.controls).forEach((key) => {
        const control = this.paymentForm.controls[key];
        control.disable();
      });
      this.walletValue = walletValue || 0;

      this.getPaymentInfo(paymentInfo);
    }

    const address = this.authService.getUserData()?.address;
    if (address) {
      this.address = address;
    }
  }

  getPaymentInfo(payment: Payment) {
    this.paymentForm.patchValue({
      cardNumber: payment?.cardNumber,
      cardYear: payment?.cardYear,
      cardMonth: payment?.cardMonth,
      cardCvv: payment?.cardCvv,
      cardFunds: payment?.cardFunds,
      cardName: payment?.cardName,
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const userId = this.authService.getUserData()?.id as number;
      const cardNumberValue = this.paymentForm.get('cardNumber')?.value;
      const cardYearValue = this.paymentForm.get('cardYear')?.value;
      const cardMonthValue = this.paymentForm.get('cardMonth')?.value;
      const cardCvvValue = this.paymentForm.get('cardCvv')?.value;
      const cardNameValue = this.paymentForm.get('cardName')?.value;
      const cardFundsValue = this.paymentForm.get('cardFunds')?.value;
      if (userId) {
        this.usersService
          .savePaymentInfo(
            cardNumberValue,
            cardYearValue,
            cardMonthValue,
            cardCvvValue,
            cardFundsValue,
            cardNameValue,
            userId
          )
          .subscribe((user) => {
            this.formSubmitted = true;
            this.authService.updateUser(user);
            Object.keys(this.paymentForm.controls).forEach((key) => {
              const control = this.paymentForm.controls[key];
              control.disable();
            });

            const paymentInfo = this.authService.getUserData()?.payment;
            if (paymentInfo) {
              this.getPaymentInfo(paymentInfo);
            }

            this.toastr.success('Hello world!', 'Toastr fun!');
          });
      }
    } else {
      return;
    }
  }
  monthValidator(control: AbstractControl): ValidationErrors | null {
    const month = control.value;
    if (month < 1 || month > 12) {
      return { invalidMonth: true };
    } else {
      return null;
    }
  }

  yearValidator(control: AbstractControl): ValidationErrors | null {
    const currentYear = new Date().getFullYear();
    const year = control.value;

    if (
      (year.length > 4 || year.length < 4) &&
      (year > currentYear || year < currentYear)
    ) {
      return { invalidYear: true };
    } else {
      return null;
    }
  }

  cvvValidator(control: AbstractControl): ValidationErrors | null {
    const cvv = control.value;
    if (!/^\d{3}$/.test(cvv)) {
      return { invalidCvv: true };
    } else {
      return null;
    }
  }

  fundsValidator(control: AbstractControl): ValidationErrors | null {
    const cardFunds = control.value;
    if (cardFunds > 10000) {
      return { invalidcardFunds: true };
    } else {
      return null;
    }
  }

  cardNumberLengthValidator(control: AbstractControl): ValidationErrors | null {
    const cardNumber = control.value;

    if ((cardNumber && cardNumber.length < 16) || cardNumber.length > 16) {
      return { invalidCardNumberLength: true };
    } else {
      return null;
    }
  }

  saveAddress() {
    const userId = this.authService.getUserData()?.id;
    if (userId) {
      this.usersService.saveAddress(this.address, userId).subscribe((user) => {
        this.address = user.address;

        const userData = this.authService.getUserData();
        if (userData) {
          userData.address = this.address;
        }
      });
    }
  }

  deleteAddress() {
    const userId = this.authService.getUserData()?.id;
    if (userId) {
      this.usersService.deleteAddress(userId).subscribe((user) => {
        this.address = user.address;

        const userData = this.authService.getUserData();
        if (userData) {
          userData.address = this.address;
        }
      });
    }
  }

  depositMoney() {
    const paymentInfo = this.authService.getUserData()?.payment;
    const userId = this.authService.getUserData()?.id;
    const userAmount = this.authService.getUserData()?.wallet || 0;
    const cardFunds = this.authService.getUserData()?.payment.cardFunds || 0;

    if (paymentInfo) {
      if (userId) {
        this.usersService
          .depositMoney(
            userId,
            +this.depositAmount,
            +userAmount,
            +cardFunds,
            paymentInfo
          )
          .subscribe((user) => {
            this.authService.updateUser(user);
            this.paymentForm.patchValue({
              cardFunds: user.payment.cardFunds,
            });
            this.walletValue = user.wallet;
            this.toastr.success('Hello world!', 'Toastr fun!');
          });
      }
    }
  }

  editPayment() {
    this.isFormEdited = true;
    Object.keys(this.paymentForm.controls).forEach((key) => {
      const control = this.paymentForm.controls[key];
      control.enable();
    });
  }
}
