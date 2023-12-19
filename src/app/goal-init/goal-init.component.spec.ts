import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalInitComponent } from './goal-init.component';

describe('GoalInitComponent', () => {
  let component: GoalInitComponent;
  let fixture: ComponentFixture<GoalInitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalInitComponent]
    });
    fixture = TestBed.createComponent(GoalInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
