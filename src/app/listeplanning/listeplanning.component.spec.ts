import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeplanningComponent } from './listeplanning.component';

describe('ListeplanningComponent', () => {
  let component: ListeplanningComponent;
  let fixture: ComponentFixture<ListeplanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeplanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeplanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
