import { Component } from '@angular/core';
import { User } from '../../models/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-account-banner',
  templateUrl: './account-banner.component.html',
  styleUrls: ['./account-banner.component.scss'],
})
export class AccountBannerComponent {
  user!: User;
  userReviewsNumber!: number;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.authService
      .getUserById(this.authService.loggedUser.id)
      .subscribe((user) => {
        this.user = user;
        this.usersService.showUserReviews(this.user.id).subscribe((reviews) => {
          console.log(reviews);
          this.userReviewsNumber = reviews.length;
        });
        this.usersService.userData$.subscribe((user: User) => {
          this.user = user;
        });
      });
  }
}
