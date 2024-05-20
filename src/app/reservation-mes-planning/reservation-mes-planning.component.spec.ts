import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationMesPlanningComponent } from './reservation-mes-planning.component';

describe('ReservationMesPlanningComponent', () => {
  let component: ReservationMesPlanningComponent;
  let fixture: ComponentFixture<ReservationMesPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationMesPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationMesPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
