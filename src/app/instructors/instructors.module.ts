import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorsRoutingModule } from './instructors-routing.module';
import { InstructorsSectionComponent } from './components/instructors-section/instructors-section.component';
import { InstructorsListComponent } from './components/instructors-list/instructors-list.component';
import { InstructorDetailsComponent } from './components/instructor-details/instructor-details.component';
import { InstructorListCardComponent } from './components/instructor-list-card/instructor-list-card.component';

@NgModule({
  declarations: [
    InstructorsSectionComponent,
    InstructorsListComponent,
    InstructorDetailsComponent,
    InstructorListCardComponent,
  ],
  imports: [CommonModule, InstructorsRoutingModule],
})
export class InstructorsModule {}
