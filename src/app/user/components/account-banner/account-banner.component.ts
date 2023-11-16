import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from '../../services/users.service';
import { Subscription, filter } from 'rxjs';
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
    this.userSubscription = this.authService.loggedUser$
      .pipe(filter((value) => value !== null))
      .subscribe((user) => {
        this.user = user as Auth;
        this.usersService.showUserReviews(this.user.id).subscribe((reviews) => {
          this.userReviewsNumber = reviews.length;
        });
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
