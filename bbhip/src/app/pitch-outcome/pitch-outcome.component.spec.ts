import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchOutcomeComponent } from './pitch-outcome.component';

describe('PitchOutcomeComponent', () => {
  let component: PitchOutcomeComponent;
  let fixture: ComponentFixture<PitchOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchOutcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
