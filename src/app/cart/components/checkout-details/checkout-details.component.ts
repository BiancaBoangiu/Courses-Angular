import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { notifierService } from 'src/app/auth/services/notifier.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.scss'],
})
export class CheckoutDetailsComponent {
  checkoutForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notifierService: notifierService,
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      country: ['', Validators.required],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required, Validators.maxLength(7)]],
      address: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    const nameValue = this.checkoutForm.get('name')?.value;
    const phoneNumberValue = this.checkoutForm.get('phoneNumber')?.value;
    const countryValue = this.checkoutForm.get('country')?.value;
    const cityValue = this.checkoutForm.get('city')?.value;
    const postalCodeValue = this.checkoutForm.get('postalCode')?.value;
    const addressValue = this.checkoutForm.get('address')?.value;

    if (this.checkoutForm.invalid) {
      this.notifierService.showError('Invalid information');
    } else {
      const userId = this.authService.getUserData()?.id;
      if (userId) {
        this.cartService
          .savePersonalDetails(
            userId,
            nameValue,
            phoneNumberValue,
            countryValue,
            cityValue,
            postalCodeValue,
            addressValue
          )
          .subscribe((user) => {
            this.authService.updateUser(user);
            this.notifierService.showNotifications('Personal details saved');
          });
      }
    }
  }
}
