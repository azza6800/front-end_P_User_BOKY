import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationMesAnnoncesComponent } from './reservation-mes-annonces.component';

describe('ReservationMesAnnoncesComponent', () => {
  let component: ReservationMesAnnoncesComponent;
  let fixture: ComponentFixture<ReservationMesAnnoncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationMesAnnoncesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationMesAnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
