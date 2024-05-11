import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilfemmeComponent } from './profilfemme.component';

describe('ProfilfemmeComponent', () => {
  let component: ProfilfemmeComponent;
  let fixture: ComponentFixture<ProfilfemmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilfemmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilfemmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
