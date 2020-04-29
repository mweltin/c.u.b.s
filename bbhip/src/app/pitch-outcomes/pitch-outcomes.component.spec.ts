import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchOutcomesComponent } from './pitch-outcomes.component';

describe('PitchOutcomesComponent', () => {
  let component: PitchOutcomesComponent;
  let fixture: ComponentFixture<PitchOutcomesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchOutcomesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
