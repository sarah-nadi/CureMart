import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveIngredients } from './active-ingredients';

describe('ActiveIngredients', () => {
  let component: ActiveIngredients;
  let fixture: ComponentFixture<ActiveIngredients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveIngredients],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveIngredients);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
