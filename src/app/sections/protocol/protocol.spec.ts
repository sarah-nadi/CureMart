import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Protocol } from './protocol';

describe('Protocol', () => {
  let component: Protocol;
  let fixture: ComponentFixture<Protocol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Protocol],
    }).compileComponents();

    fixture = TestBed.createComponent(Protocol);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
