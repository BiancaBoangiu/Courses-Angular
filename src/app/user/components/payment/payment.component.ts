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

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  paymentForm: FormGroup;
  address!: string;
  formSubmitted: boolean = false;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, this.cardNumberLengthValidator]],
      cardYear: ['', [Validators.required, this.yearValidator]],
      cardMonth: ['', [Validators.required, this.monthValidator]],
      cardCvv: ['', [Validators.required, this.cvvValidator]],
      cardName: ['', Validators.required],
    });
  }

  ngOnInit() {
    const paymentInfo = this.authService.getUserData()?.payment;
    if (paymentInfo) {
      this.getPaymentInfo();
    }

    const address = this.authService.getUserData()?.address;
    if (address) {
      this.address = address;
    }
  }

  getPaymentInfo() {
    const paymentInfo = this.authService.getUserData()?.payment;

    this.paymentForm.patchValue({
      cardNumber: paymentInfo?.cardNumber,
      cardYear: paymentInfo?.cardYear,
      cardMonth: paymentInfo?.cardMonth,
      cardCvv: paymentInfo?.cardCvv,
      cardName: paymentInfo?.cardName,
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.paymentForm.valid) {
      const userId = this.authService.getUserData()?.id as number;
      const cardNumberValue = this.paymentForm.get('cardNumber')?.value;
      const cardYearValue = this.paymentForm.get('cardYear')?.value;
      const cardMonthValue = this.paymentForm.get('cardMonth')?.value;
      const cardCvvValue = this.paymentForm.get('cardCvv')?.value;
      const cardNameValue = this.paymentForm.get('cardName')?.value;
      if (userId) {
        this.usersService
          .savePaymentInfo(
            cardNumberValue,
            cardYearValue,
            cardMonthValue,
            cardCvvValue,
            cardNameValue,
            userId
          )
          .subscribe(() => {});
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
}
