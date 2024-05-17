import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicenettoyageComponent } from './servicenettoyage.component';

describe('ServicenettoyageComponent', () => {
  let component: ServicenettoyageComponent;
  let fixture: ComponentFixture<ServicenettoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicenettoyageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicenettoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
