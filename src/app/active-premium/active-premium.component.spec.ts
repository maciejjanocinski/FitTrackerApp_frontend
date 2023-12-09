import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePremiumComponent } from './active-premium.component';

describe('ActivePremiumComponent', () => {
  let component: ActivePremiumComponent;
  let fixture: ComponentFixture<ActivePremiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivePremiumComponent]
    });
    fixture = TestBed.createComponent(ActivePremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
