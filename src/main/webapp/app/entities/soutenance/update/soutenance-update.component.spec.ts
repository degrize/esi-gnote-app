import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { SoutenanceService } from '../service/soutenance.service';
import { ISoutenance, Soutenance } from '../soutenance.model';

import { SoutenanceUpdateComponent } from './soutenance-update.component';

describe('Soutenance Management Update Component', () => {
  let comp: SoutenanceUpdateComponent;
  let fixture: ComponentFixture<SoutenanceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let soutenanceService: SoutenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [SoutenanceUpdateComponent],
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
      .overrideTemplate(SoutenanceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SoutenanceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    soutenanceService = TestBed.inject(SoutenanceService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const soutenance: ISoutenance = { id: 456 };

      activatedRoute.data = of({ soutenance });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(soutenance));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Soutenance>>();
      const soutenance = { id: 123 };
      jest.spyOn(soutenanceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soutenance });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soutenance }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(soutenanceService.update).toHaveBeenCalledWith(soutenance);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Soutenance>>();
      const soutenance = new Soutenance();
      jest.spyOn(soutenanceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soutenance });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: soutenance }));
      saveSubject.complete();

      // THEN
      expect(soutenanceService.create).toHaveBeenCalledWith(soutenance);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Soutenance>>();
      const soutenance = { id: 123 };
      jest.spyOn(soutenanceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ soutenance });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(soutenanceService.update).toHaveBeenCalledWith(soutenance);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
