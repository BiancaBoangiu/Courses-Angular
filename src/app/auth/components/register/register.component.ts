import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Reviews } from 'src/app/courses/models/reviews.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  emailValue: string = '';
  passwordValue: string = '';
  userType: string = '';
  confirmedPasswordValue: string = '';
  matchedPasswordsError: boolean = false;
  passwordLengthError: boolean = false;
  confirmedPasswordLengthError: boolean = false;
  emailEmptyFieldError: boolean = false;
  passwordEmptyFieldError: boolean = false;
  confirmedPasswordEmptyFieldError: boolean = false;
  selectEmptyFieldError: boolean = false;
  invalidEmailError: boolean = false;
  usedEmailError: boolean = false;
  reviews: Reviews[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  registerUser(): void {
    this.passwordLengthError = false;
    this.matchedPasswordsError = false;
    this.emailEmptyFieldError = false;
    this.passwordEmptyFieldError = false;
    this.confirmedPasswordEmptyFieldError = false;
    this.selectEmptyFieldError = false;
    this.confirmedPasswordLengthError = false;
    this.invalidEmailError = false;
    this.usedEmailError = false;

    if (this.emailValue == '') {
      this.emailEmptyFieldError = true;
    } else if (!this.isValidEmail(this.emailValue)) {
      this.invalidEmailError = true;
    }

    if (this.passwordValue == '') {
      this.passwordEmptyFieldError = true;
    } else if (this.passwordValue.length < 5) {
      this.passwordLengthError = true;
    } else if (this.passwordValue !== this.confirmedPasswordValue) {
      this.matchedPasswordsError = true;
    }

    if (this.confirmedPasswordValue == '') {
      this.confirmedPasswordEmptyFieldError = true;
    } else if (this.confirmedPasswordValue.length < 5) {
      this.confirmedPasswordLengthError = true;
    } else if (this.passwordValue !== this.confirmedPasswordValue) {
      this.matchedPasswordsError = true;
    }

    if (this.userType == '') {
      this.selectEmptyFieldError = true;
    }

    if (
      !this.passwordLengthError &&
      !this.matchedPasswordsError &&
      !this.emailEmptyFieldError &&
      !this.passwordEmptyFieldError &&
      !this.confirmedPasswordEmptyFieldError &&
      !this.selectEmptyFieldError &&
      !this.invalidEmailError
    ) {
      this.authService.verifyUser(this.emailValue).subscribe((response) => {
        if (response.length > 0) {
          this.usedEmailError = true;
        } else {
          this.authService
            .registerUser(
              this.emailValue,
              this.passwordValue,
              this.userType,
              this.reviews
            )
            .pipe(
              catchError((error) => {
                console.error(error);
                alert('Error: ' + error.message);
                return throwError(error);
              })
            )
            .subscribe(() => {
              this.router.navigate(['/']);
            });
        }
      });
      //
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
  }
}
