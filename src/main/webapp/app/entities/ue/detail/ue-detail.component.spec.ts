import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UEDetailComponent } from './ue-detail.component';

describe('UE Management Detail Component', () => {
  let comp: UEDetailComponent;
  let fixture: ComponentFixture<UEDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UEDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ uE: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UEDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UEDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load uE on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.uE).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
