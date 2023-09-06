import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { ListComponent } from './components/list/list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseGridCardComponent } from './components/course-grid-card/course-grid-card.component';
import { FormsModule } from '@angular/forms';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ReviewSectionComponent } from './components/review-section/review-section.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { ReviewComponent } from './components/review/review.component';
import { CurriculumComponent } from '../curriculum/curriculum.component';

@NgModule({
  declarations: [
    ListComponent,
    CourseDetailsComponent,
    CourseGridCardComponent,
    ReviewListComponent,
    ReviewSectionComponent,
    AddReviewComponent,
    ReviewComponent,
    CurriculumComponent,
  ],
  imports: [CommonModule, CoursesRoutingModule, FormsModule],
})
export class CoursesModule {}
