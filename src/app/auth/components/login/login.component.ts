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

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  loginUser() {
    this.authService
      .loginUser(this.loginEmailValue)
      .pipe(
        catchError((error) => {
          console.error(error);
          alert('Error: ' + error.message);
          return throwError(error);
        })
      )
      .subscribe((response) => {
        this.emailError = false;
        this.passwordError = false;
        this.accountError = false;
        this.passwordLengthError = false;
        if (response.length > 0) {
          if (this.loginPasswordValue.length < 5) {
            this.passwordLengthError = true;
          }
          if (this.loginPasswordValue !== response[0].password) {
            this.passwordError = true;
          } else {
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
