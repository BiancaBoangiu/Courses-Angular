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
  loginEmailValue!: string;
  loginPasswordValue!: string;

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
        if (response.length > 0) {
          if (this.loginPasswordValue !== response[0].password) {
            alert('password not correct');
          } else {
            this.router.navigate(['/']);
          }
        } else {
          alert('invalid email or password');
        }
      });
  }
}
