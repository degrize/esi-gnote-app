import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { JuryService } from '../service/jury.service';
import { IJury, Jury } from '../jury.model';

import { JuryUpdateComponent } from './jury-update.component';

describe('Jury Management Update Component', () => {
  let comp: JuryUpdateComponent;
  let fixture: ComponentFixture<JuryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let juryService: JuryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [JuryUpdateComponent],
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
      .overrideTemplate(JuryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JuryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    juryService = TestBed.inject(JuryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const jury: IJury = { id: 456 };

      activatedRoute.data = of({ jury });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(jury));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Jury>>();
      const jury = { id: 123 };
      jest.spyOn(juryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jury });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jury }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(juryService.update).toHaveBeenCalledWith(jury);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Jury>>();
      const jury = new Jury();
      jest.spyOn(juryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jury });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jury }));
      saveSubject.complete();

      // THEN
      expect(juryService.create).toHaveBeenCalledWith(jury);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Jury>>();
      const jury = { id: 123 };
      jest.spyOn(juryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jury });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(juryService.update).toHaveBeenCalledWith(jury);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
