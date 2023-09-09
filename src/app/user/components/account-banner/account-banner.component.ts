import { Component } from '@angular/core';
import { User } from '../../models/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-account-banner',
  templateUrl: './account-banner.component.html',
  styleUrls: ['./account-banner.component.scss'],
})
export class AccountBannerComponent {
  user!: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.authService
      .getUserById(this.authService.loggedUser.id)
      .subscribe((user) => {
        this.user = user;
      });
  }
}
