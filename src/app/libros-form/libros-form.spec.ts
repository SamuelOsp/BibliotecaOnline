import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosForm } from './libros-form';

describe('LibrosForm', () => {
  let component: LibrosForm;
  let fixture: ComponentFixture<LibrosForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrosForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
