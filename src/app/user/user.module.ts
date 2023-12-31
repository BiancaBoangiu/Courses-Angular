import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './components/account/account.component';
import { AccountBannerComponent } from './components/account-banner/account-banner.component';
import { AccountNavbarComponent } from './components/account-navbar/account-navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteProfileComponent } from './components/delete-profile/delete-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { WishlistCardComponent } from './components/wishlist-card/wishlist-card.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountBannerComponent,
    AccountNavbarComponent,
    DashboardComponent,
    DeleteProfileComponent,
    EditProfileComponent,
    PaymentComponent,
    SettingsComponent,
    SubscriptionsComponent,
    WishlistComponent,
    WishlistCardComponent,
    CoursesListComponent,
    CourseDetailsComponent,
  ],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, FormsModule],
})
export class UserModule {}
