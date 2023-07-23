import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, throwError } from 'rxjs';

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
  isCheckboxChecked: boolean = false;
  matchedPasswordsError: boolean = false;
  passwordLengthError: boolean = false;
  confirmedPasswordLengthError: boolean = false;
  emailEmptyFieldError: boolean = false;
  passwordEmptyFieldError: boolean = false;
  confirmedPasswordEmptyFieldError: boolean = false;
  selectEmptyFieldError: boolean = false;
  checkboxError: boolean = false;

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
    this.checkboxError = false;

    if (this.emailValue == '') {
      this.emailEmptyFieldError = true;
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

    if (this.isCheckboxChecked === false) {
      this.checkboxError = true;
    }

    if (
      !this.passwordLengthError &&
      !this.matchedPasswordsError &&
      !this.emailEmptyFieldError &&
      !this.passwordEmptyFieldError &&
      !this.confirmedPasswordEmptyFieldError &&
      !this.selectEmptyFieldError
    ) {
      this.authService
        .registerUser(this.emailValue, this.passwordValue, this.userType)
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
  }
}
