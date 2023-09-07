import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateWithPeopleComponent } from './collaborate-with-people.component';

describe('CollaborateWithPeopleComponent', () => {
  let component: CollaborateWithPeopleComponent;
  let fixture: ComponentFixture<CollaborateWithPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaborateWithPeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaborateWithPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
