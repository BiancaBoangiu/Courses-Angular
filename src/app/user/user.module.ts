import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './components/account/account.component';
import { UserBannerComponent } from './components/account-banner/user-banner.component';
import { UserMenuComponent } from './components/account-navbar/user-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AccountComponent,
    UserBannerComponent,
    UserMenuComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
