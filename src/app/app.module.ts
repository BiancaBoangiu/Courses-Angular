import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseTrendingCardComponent } from './course-trending-card/course-trending-card.component';
import { BannerComponent } from './banner/banner.component';
import { ListComponent } from './list/list.component';
import { CourseListCardComponent } from './course-list-card/course-list-card.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    CourseCardComponent,
    CourseTrendingCardComponent,
    BannerComponent,
    ListComponent,
    CourseListCardComponent,
    CourseDetailsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
