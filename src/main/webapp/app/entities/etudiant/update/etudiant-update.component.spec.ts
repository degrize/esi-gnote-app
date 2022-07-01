import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { EtudiantService } from '../service/etudiant.service';
import { IEtudiant, Etudiant } from '../etudiant.model';
import { IEncadreur } from 'app/entities/encadreur/encadreur.model';
import { EncadreurService } from 'app/entities/encadreur/service/encadreur.service';

import { EtudiantUpdateComponent } from './etudiant-update.component';

describe('Etudiant Management Update Component', () => {
  let comp: EtudiantUpdateComponent;
  let fixture: ComponentFixture<EtudiantUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let etudiantService: EtudiantService;
  let encadreurService: EncadreurService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [EtudiantUpdateComponent],
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
      .overrideTemplate(EtudiantUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EtudiantUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    etudiantService = TestBed.inject(EtudiantService);
    encadreurService = TestBed.inject(EncadreurService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Encadreur query and add missing value', () => {
      const etudiant: IEtudiant = { id: 456 };
      const encadreur: IEncadreur = { id: 30672 };
      etudiant.encadreur = encadreur;

      const encadreurCollection: IEncadreur[] = [{ id: 36715 }];
      jest.spyOn(encadreurService, 'query').mockReturnValue(of(new HttpResponse({ body: encadreurCollection })));
      const additionalEncadreurs = [encadreur];
      const expectedCollection: IEncadreur[] = [...additionalEncadreurs, ...encadreurCollection];
      jest.spyOn(encadreurService, 'addEncadreurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ etudiant });
      comp.ngOnInit();

      expect(encadreurService.query).toHaveBeenCalled();
      expect(encadreurService.addEncadreurToCollectionIfMissing).toHaveBeenCalledWith(encadreurCollection, ...additionalEncadreurs);
      expect(comp.encadreursSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const etudiant: IEtudiant = { id: 456 };
      const encadreur: IEncadreur = { id: 22553 };
      etudiant.encadreur = encadreur;

      activatedRoute.data = of({ etudiant });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(etudiant));
      expect(comp.encadreursSharedCollection).toContain(encadreur);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Etudiant>>();
      const etudiant = { id: 123 };
      jest.spyOn(etudiantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etudiant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: etudiant }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(etudiantService.update).toHaveBeenCalledWith(etudiant);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Etudiant>>();
      const etudiant = new Etudiant();
      jest.spyOn(etudiantService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etudiant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: etudiant }));
      saveSubject.complete();

      // THEN
      expect(etudiantService.create).toHaveBeenCalledWith(etudiant);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Etudiant>>();
      const etudiant = { id: 123 };
      jest.spyOn(etudiantService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ etudiant });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(etudiantService.update).toHaveBeenCalledWith(etudiant);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackEncadreurById', () => {
      it('Should return tracked Encadreur primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEncadreurById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
