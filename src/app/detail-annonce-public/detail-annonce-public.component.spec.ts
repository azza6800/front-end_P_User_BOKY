import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnnoncePublicComponent } from './detail-annonce-public.component';

describe('DetailAnnoncePublicComponent', () => {
  let component: DetailAnnoncePublicComponent;
  let fixture: ComponentFixture<DetailAnnoncePublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAnnoncePublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAnnoncePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
