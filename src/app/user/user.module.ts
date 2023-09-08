import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './components/account/account.component';
import { AccountBannerComponent } from './components/account-banner/account-banner.component';
import { AccountNavbarComponent } from './components/account-navbar/account-navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountBannerComponent,
    AccountNavbarComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
