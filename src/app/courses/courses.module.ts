import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { ListComponent } from './components/list/list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseGridCardComponent } from './components/course-grid-card/course-grid-card.component';
import { FormsModule } from '@angular/forms';
import { ReviewComponent } from './components/review/review.component';

@NgModule({
  declarations: [
    ListComponent,
    CourseDetailsComponent,
    CourseGridCardComponent,
    ReviewComponent,
  ],
  imports: [CommonModule, CoursesRoutingModule, FormsModule],
})
export class CoursesModule {}
