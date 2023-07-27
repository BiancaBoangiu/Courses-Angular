import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginEmailValue: string = '';
  loginPasswordValue: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;
  accountError: boolean = false;
  passwordLengthError: boolean = false;
  invalidEmailError: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  loginUser() {
    this.emailError = false;
    this.passwordError = false;
    this.accountError = false;
    this.passwordLengthError = false;
    this.invalidEmailError = false;

    if (this.loginEmailValue == '') {
      this.emailError = true;
    } else if (!this.isValidEmail(this.loginEmailValue)) {
      this.invalidEmailError = true;
    } else {
      this.authService
        .verifyUser(this.loginEmailValue)
        .pipe(
          catchError((error) => {
            console.error(error);
            alert('Error: ' + error.message);
            return throwError(error);
          })
        )
        .subscribe((response) => {
          if (response.length > 0) {
            if (this.loginPasswordValue.length < 5) {
              this.passwordLengthError = true;
            }
            if (this.loginPasswordValue !== response[0].password) {
              this.passwordError = true;
            } else {
              this.authService.loggedUser = response[0];
              this.router.navigate(['/']);
            }
          } else {
            if (this.loginEmailValue == '') {
              this.emailError = true;
              this.passwordError = true;
            } else {
              this.accountError = true;
            }
          }
        });
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
  }
}
