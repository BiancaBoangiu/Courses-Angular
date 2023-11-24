import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorsRoutingModule } from './instructors-routing.module';
import { InstructorsSectionComponent } from './components/instructors-section/instructors-section.component';
import { InstructorsListComponent } from './components/instructors-list/instructors-list.component';
import { InstructorDetailsComponent } from './components/instructor-details/instructor-details.component';
import { InstructorListCardComponent } from './components/instructor-list-card/instructor-list-card.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    InstructorsSectionComponent,
    InstructorsListComponent,
    InstructorDetailsComponent,
    InstructorListCardComponent,
    CreateCourseComponent,
  ],
  imports: [
    CommonModule,
    InstructorsRoutingModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatTabsModule,
  ],
})
export class InstructorsModule {}
