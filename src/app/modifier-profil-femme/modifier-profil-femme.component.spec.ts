import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierProfilFemmeComponent } from './modifier-profil-femme.component';

describe('ModifierProfilFemmeComponent', () => {
  let component: ModifierProfilFemmeComponent;
  let fixture: ComponentFixture<ModifierProfilFemmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierProfilFemmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierProfilFemmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
