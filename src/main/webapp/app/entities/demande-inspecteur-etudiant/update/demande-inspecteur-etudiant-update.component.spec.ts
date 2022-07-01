import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DemandeInspecteurEtudiantService } from '../service/demande-inspecteur-etudiant.service';
import { IDemandeInspecteurEtudiant, DemandeInspecteurEtudiant } from '../demande-inspecteur-etudiant.model';

import { DemandeInspecteurEtudiantUpdateComponent } from './demande-inspecteur-etudiant-update.component';

describe('DemandeInspecteurEtudiant Management Update Component', () => {
  let comp: DemandeInspecteurEtudiantUpdateComponent;
  let fixture: ComponentFixture<DemandeInspecteurEtudiantUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let demandeInspecteurEtudiantService: DemandeInspecteurEtudiantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DemandeInspecteurEtudiantUpdateComponent],
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
      .overrideTemplate(DemandeInspecteurEtudiantUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DemandeInspecteurEtudiantUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    demandeInspecteurEtudiantService = TestBed.inject(DemandeInspecteurEtudiantService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const demandeInspecteurEtudiant: IDemandeInspecteurEtudiant = { id: 456 };

      activatedRoute.data = of({ demandeInspecteurEtudiant });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(demandeInspecteurEtudiant));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeInspecteurEtudiant>>();
      const demandeInspecteurEtudiant = { id: 123 };
      jest.spyOn(demandeInspecteurEtudiantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeInspecteurEtudiant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demandeInspecteurEtudiant }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(demandeInspecteurEtudiantService.update).toHaveBeenCalledWith(demandeInspecteurEtudiant);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeInspecteurEtudiant>>();
      const demandeInspecteurEtudiant = new DemandeInspecteurEtudiant();
      jest.spyOn(demandeInspecteurEtudiantService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeInspecteurEtudiant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: demandeInspecteurEtudiant }));
      saveSubject.complete();

      // THEN
      expect(demandeInspecteurEtudiantService.create).toHaveBeenCalledWith(demandeInspecteurEtudiant);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DemandeInspecteurEtudiant>>();
      const demandeInspecteurEtudiant = { id: 123 };
      jest.spyOn(demandeInspecteurEtudiantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ demandeInspecteurEtudiant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(demandeInspecteurEtudiantService.update).toHaveBeenCalledWith(demandeInspecteurEtudiant);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
