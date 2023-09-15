import { Component } from '@angular/core';
import { User } from '../../models/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/auth/models/auth.interface';

@Component({
  selector: 'app-account-banner',
  templateUrl: './account-banner.component.html',
  styleUrls: ['./account-banner.component.scss'],
})
export class AccountBannerComponent {
  user!: Auth;
  userReviewsNumber!: number;
  userSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    if (!this.authService.getUserData()) {
      return;
    }

    const userId = this.authService.getUserData()?.id as number;
    this.authService.getUserById(userId).subscribe((user) => {
      this.authService.updateUser(user);
      this.usersService.showUserReviews(this.user.id).subscribe((reviews) => {
        this.userReviewsNumber = reviews.length;
      });
    });

    this.userSubscription = this.authService.loggedUser$.subscribe(
      (user: Auth) => {
        this.user = user;
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
