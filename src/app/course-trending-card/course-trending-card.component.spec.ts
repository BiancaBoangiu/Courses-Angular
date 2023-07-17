import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseTrendingCardComponent } from './course-trending-card.component';

describe('CourseTrendingCardComponent', () => {
  let component: CourseTrendingCardComponent;
  let fixture: ComponentFixture<CourseTrendingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseTrendingCardComponent]
    });
    fixture = TestBed.createComponent(CourseTrendingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
