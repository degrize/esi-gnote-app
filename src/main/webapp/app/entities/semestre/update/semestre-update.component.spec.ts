import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SemestreService } from '../service/semestre.service';
import { ISemestre, Semestre } from '../semestre.model';

import { SemestreUpdateComponent } from './semestre-update.component';

describe('Semestre Management Update Component', () => {
  let comp: SemestreUpdateComponent;
  let fixture: ComponentFixture<SemestreUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let semestreService: SemestreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SemestreUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(SemestreUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SemestreUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    semestreService = TestBed.inject(SemestreService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const semestre: ISemestre = { id: 456 };

      activatedRoute.data = of({ semestre });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(semestre));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Semestre>>();
      const semestre = { id: 123 };
      jest.spyOn(semestreService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ semestre });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: semestre }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(semestreService.update).toHaveBeenCalledWith(semestre);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Semestre>>();
      const semestre = new Semestre();
      jest.spyOn(semestreService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ semestre });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: semestre }));
      saveSubject.complete();

      // THEN
      expect(semestreService.create).toHaveBeenCalledWith(semestre);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Semestre>>();
      const semestre = { id: 123 };
      jest.spyOn(semestreService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ semestre });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(semestreService.update).toHaveBeenCalledWith(semestre);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
