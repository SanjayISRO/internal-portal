import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationDayFormComponent } from './innovation-day-form.component';

describe('InnovationDayFormComponent', () => {
  let component: InnovationDayFormComponent;
  let fixture: ComponentFixture<InnovationDayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnovationDayFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnovationDayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
