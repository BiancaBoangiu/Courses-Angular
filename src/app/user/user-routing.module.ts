import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { DeleteProfileComponent } from './components/delete-profile/delete-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'delete-profile', component: DeleteProfileComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: 'user-courses', component: UserCoursesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
