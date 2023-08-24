import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorListCardComponent } from './instructor-list-card.component';

describe('InstructorListCardComponent', () => {
  let component: InstructorListCardComponent;
  let fixture: ComponentFixture<InstructorListCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorListCardComponent]
    });
    fixture = TestBed.createComponent(InstructorListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
