import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBaseComponent } from './on-base.component';

describe('OnBaseComponent', () => {
  let component: OnBaseComponent;
  let fixture: ComponentFixture<OnBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
