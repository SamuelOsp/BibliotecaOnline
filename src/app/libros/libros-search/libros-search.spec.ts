import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosSearch } from './libros-search';

describe('LibrosSearch', () => {
  let component: LibrosSearch;
  let fixture: ComponentFixture<LibrosSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrosSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrosSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
