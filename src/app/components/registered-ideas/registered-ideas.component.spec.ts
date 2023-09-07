import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredIdeasComponent } from './registered-ideas.component';

describe('RegisteredIdeasComponent', () => {
  let component: RegisteredIdeasComponent;
  let fixture: ComponentFixture<RegisteredIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredIdeasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
