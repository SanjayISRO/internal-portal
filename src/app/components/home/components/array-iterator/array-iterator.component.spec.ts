import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayIteratorComponent } from './array-iterator.component';

describe('ArrayIteratorComponent', () => {
  let component: ArrayIteratorComponent;
  let fixture: ComponentFixture<ArrayIteratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayIteratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayIteratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
