import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ECDetailComponent } from './ec-detail.component';

describe('EC Management Detail Component', () => {
  let comp: ECDetailComponent;
  let fixture: ComponentFixture<ECDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ECDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ eC: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ECDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ECDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load eC on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.eC).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
