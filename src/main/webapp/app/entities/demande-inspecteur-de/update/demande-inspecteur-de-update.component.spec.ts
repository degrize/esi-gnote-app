import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DemandeInspecteurDEService } from '../service/demande-inspecteur-de.service';
import { IDemandeInspecteurDE, DemandeInspecteurDE } from '../demande-inspecteur-de.model';

import { DemandeInspecteurDEUpdateComponent } from './demande-inspecteur-de-update.component';

describe('DemandeInspecteurDE Management Update Component', () => {
  let comp: DemandeInspecteurDEUpdateComponent;
  let fixture: ComponentFixture<DemandeInspecteurDEUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let demandeInspecteurDEService: DemandeInspecteurDEService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DemandeInspecteurDEUpdateComponent],
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
      .overrideTemplate(DemandeInspecteurDEUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DemandeInspecteurDEUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    demandeInspecteurDEService = TestBed.inject(DemandeInspecteurDEService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const demandeInspecteurDE: IDemandeInspecteurDE = { id: 456 };

      activatedRoute.data = of({ demandeInspecteurDE });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(demandeInspecteurDE));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeInspecteurDE>>();
      const demandeInspecteurDE = { id: 123 };
      jest.spyOn(demandeInspecteurDEService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeInspecteurDE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demandeInspecteurDE }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(demandeInspecteurDEService.update).toHaveBeenCalledWith(demandeInspecteurDE);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeInspecteurDE>>();
      const demandeInspecteurDE = new DemandeInspecteurDE();
      jest.spyOn(demandeInspecteurDEService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeInspecteurDE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demandeInspecteurDE }));
      saveSubject.complete();

      // THEN
      expect(demandeInspecteurDEService.create).toHaveBeenCalledWith(demandeInspecteurDE);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeInspecteurDE>>();
      const demandeInspecteurDE = { id: 123 };
      jest.spyOn(demandeInspecteurDEService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeInspecteurDE });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(demandeInspecteurDEService.update).toHaveBeenCalledWith(demandeInspecteurDE);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
