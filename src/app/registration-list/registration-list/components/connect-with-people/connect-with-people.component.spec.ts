import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectWithPeopleComponent } from './connect-with-people.component';

describe('ConnectWithPeopleComponent', () => {
  let component: ConnectWithPeopleComponent;
  let fixture: ComponentFixture<ConnectWithPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectWithPeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectWithPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
