import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAnnoncesPublicComponent } from './liste-annonces-public.component';

describe('ListeAnnoncesPublicComponent', () => {
  let component: ListeAnnoncesPublicComponent;
  let fixture: ComponentFixture<ListeAnnoncesPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAnnoncesPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAnnoncesPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
