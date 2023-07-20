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
  emailValue!: string;
  passwordValue!: string;
  userType: string = '';
  confirmedPasswordValue!: string;
  isCheckboxChecked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  registerUser(): void {
    if (this.passwordValue !== this.confirmedPasswordValue) {
      return alert('Passwords do not match');
    }
    if (
      this.emailValue == '' ||
      this.passwordValue == '' ||
      this.userType == '' ||
      this.isCheckboxChecked === false
    ) {
      return alert('All fields required');
    }
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
