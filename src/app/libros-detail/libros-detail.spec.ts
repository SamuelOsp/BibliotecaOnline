import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosDetail } from './libros-detail';

describe('LibrosDetail', () => {
  let component: LibrosDetail;
  let fixture: ComponentFixture<LibrosDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrosDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
