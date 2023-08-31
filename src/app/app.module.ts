import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { BannerComponent } from './banner/banner.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { PopularCourseCardComponent } from './main/components/popular-course-card/popular-course-card.component';
import { MainComponent } from './main/components/main/main.component';
import { UserCoursesComponent } from './user/components/user-courses/user-courses.component';
import { PaymentComponent } from './user/components/payment/payment.component';
import { DeleteProfileComponent } from './user/components/delete-profile/delete-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CourseCardComponent,
    BannerComponent,
    NotFoundComponent,
    PopularCourseCardComponent,
    UserCoursesComponent,
    PaymentComponent,
    DeleteProfileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
