import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCourseCardComponent } from './popular-course-card.component';

describe('PopularCourseCardComponent', () => {
  let component: PopularCourseCardComponent;
  let fixture: ComponentFixture<PopularCourseCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularCourseCardComponent]
    });
    fixture = TestBed.createComponent(PopularCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
