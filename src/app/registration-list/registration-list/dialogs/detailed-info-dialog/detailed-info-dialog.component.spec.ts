import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedInfoDialogComponent } from './detailed-info-dialog.component';

describe('DetailedInfoDialogComponent', () => {
  let component: DetailedInfoDialogComponent;
  let fixture: ComponentFixture<DetailedInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
