import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StimulusComponent } from './stimulus.component';

describe('StimulusComponent', () => {
  let component: StimulusComponent;
  let fixture: ComponentFixture<StimulusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StimulusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StimulusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
