import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityElementComponent } from './activity-element.component';

describe('ActivityElementComponent', () => {
  let component: ActivityElementComponent;
  let fixture: ComponentFixture<ActivityElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityElementComponent]
    });
    fixture = TestBed.createComponent(ActivityElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
