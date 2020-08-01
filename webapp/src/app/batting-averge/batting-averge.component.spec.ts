import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattingAvergeComponent } from './batting-averge.component';

describe('BattingAvergeComponent', () => {
  let component: BattingAvergeComponent;
  let fixture: ComponentFixture<BattingAvergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattingAvergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattingAvergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
