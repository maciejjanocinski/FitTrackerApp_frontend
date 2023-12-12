import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeElementComponent } from './recipe-element.component';

describe('RecipeElementComponent', () => {
  let component: RecipeElementComponent;
  let fixture: ComponentFixture<RecipeElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeElementComponent]
    });
    fixture = TestBed.createComponent(RecipeElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
