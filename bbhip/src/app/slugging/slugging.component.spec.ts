import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SluggingComponent } from './slugging.component';

describe('SluggingComponent', () => {
  let component: SluggingComponent;
  let fixture: ComponentFixture<SluggingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SluggingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SluggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
