import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AbsenceService } from '../service/absence.service';
import { IAbsence, Absence } from '../absence.model';
import { IProfesseur } from 'app/entities/professeur/professeur.model';
import { ProfesseurService } from 'app/entities/professeur/service/professeur.service';
import { IInspecteur } from 'app/entities/inspecteur/inspecteur.model';
import { InspecteurService } from 'app/entities/inspecteur/service/inspecteur.service';
import { IEC } from 'app/entities/ec/ec.model';
import { ECService } from 'app/entities/ec/service/ec.service';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';

import { AbsenceUpdateComponent } from './absence-update.component';

describe('Absence Management Update Component', () => {
  let comp: AbsenceUpdateComponent;
  let fixture: ComponentFixture<AbsenceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let absenceService: AbsenceService;
  let professeurService: ProfesseurService;
  let inspecteurService: InspecteurService;
  let eCService: ECService;
  let etudiantService: EtudiantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AbsenceUpdateComponent],
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
      .overrideTemplate(AbsenceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AbsenceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    absenceService = TestBed.inject(AbsenceService);
    professeurService = TestBed.inject(ProfesseurService);
    inspecteurService = TestBed.inject(InspecteurService);
    eCService = TestBed.inject(ECService);
    etudiantService = TestBed.inject(EtudiantService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Professeur query and add missing value', () => {
      const absence: IAbsence = { id: 456 };
      const professeur: IProfesseur = { id: 26873 };
      absence.professeur = professeur;

      const professeurCollection: IProfesseur[] = [{ id: 70946 }];
      jest.spyOn(professeurService, 'query').mockReturnValue(of(new HttpResponse({ body: professeurCollection })));
      const additionalProfesseurs = [professeur];
      const expectedCollection: IProfesseur[] = [...additionalProfesseurs, ...professeurCollection];
      jest.spyOn(professeurService, 'addProfesseurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ absence });
      comp.ngOnInit();

      expect(professeurService.query).toHaveBeenCalled();
      expect(professeurService.addProfesseurToCollectionIfMissing).toHaveBeenCalledWith(professeurCollection, ...additionalProfesseurs);
      expect(comp.professeursSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Inspecteur query and add missing value', () => {
      const absence: IAbsence = { id: 456 };
      const inspecteur: IInspecteur = { id: 98358 };
      absence.inspecteur = inspecteur;

      const inspecteurCollection: IInspecteur[] = [{ id: 32808 }];
      jest.spyOn(inspecteurService, 'query').mockReturnValue(of(new HttpResponse({ body: inspecteurCollection })));
      const additionalInspecteurs = [inspecteur];
      const expectedCollection: IInspecteur[] = [...additionalInspecteurs, ...inspecteurCollection];
      jest.spyOn(inspecteurService, 'addInspecteurToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ absence });
      comp.ngOnInit();

      expect(inspecteurService.query).toHaveBeenCalled();
      expect(inspecteurService.addInspecteurToCollectionIfMissing).toHaveBeenCalledWith(inspecteurCollection, ...additionalInspecteurs);
      expect(comp.inspecteursSharedCollection).toEqual(expectedCollection);
    });

    it('Should call EC query and add missing value', () => {
      const absence: IAbsence = { id: 456 };
      const eC: IEC = { id: 37906 };
      absence.eC = eC;

      const eCCollection: IEC[] = [{ id: 78405 }];
      jest.spyOn(eCService, 'query').mockReturnValue(of(new HttpResponse({ body: eCCollection })));
      const additionalECS = [eC];
      const expectedCollection: IEC[] = [...additionalECS, ...eCCollection];
      jest.spyOn(eCService, 'addECToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ absence });
      comp.ngOnInit();

      expect(eCService.query).toHaveBeenCalled();
      expect(eCService.addECToCollectionIfMissing).toHaveBeenCalledWith(eCCollection, ...additionalECS);
      expect(comp.eCSSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Etudiant query and add missing value', () => {
      const absence: IAbsence = { id: 456 };
      const etudiant: IEtudiant = { id: 92522 };
      absence.etudiant = etudiant;

      const etudiantCollection: IEtudiant[] = [{ id: 39997 }];
      jest.spyOn(etudiantService, 'query').mockReturnValue(of(new HttpResponse({ body: etudiantCollection })));
      const additionalEtudiants = [etudiant];
      const expectedCollection: IEtudiant[] = [...additionalEtudiants, ...etudiantCollection];
      jest.spyOn(etudiantService, 'addEtudiantToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ absence });
      comp.ngOnInit();

      expect(etudiantService.query).toHaveBeenCalled();
      expect(etudiantService.addEtudiantToCollectionIfMissing).toHaveBeenCalledWith(etudiantCollection, ...additionalEtudiants);
      expect(comp.etudiantsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const absence: IAbsence = { id: 456 };
      const professeur: IProfesseur = { id: 7318 };
      absence.professeur = professeur;
      const inspecteur: IInspecteur = { id: 35849 };
      absence.inspecteur = inspecteur;
      const eC: IEC = { id: 18735 };
      absence.eC = eC;
      const etudiant: IEtudiant = { id: 41990 };
      absence.etudiant = etudiant;

      activatedRoute.data = of({ absence });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(absence));
      expect(comp.professeursSharedCollection).toContain(professeur);
      expect(comp.inspecteursSharedCollection).toContain(inspecteur);
      expect(comp.eCSSharedCollection).toContain(eC);
      expect(comp.etudiantsSharedCollection).toContain(etudiant);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Absence>>();
      const absence = { id: 123 };
      jest.spyOn(absenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ absence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: absence }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(absenceService.update).toHaveBeenCalledWith(absence);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Absence>>();
      const absence = new Absence();
      jest.spyOn(absenceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ absence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: absence }));
      saveSubject.complete();

      // THEN
      expect(absenceService.create).toHaveBeenCalledWith(absence);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Absence>>();
      const absence = { id: 123 };
      jest.spyOn(absenceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ absence });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(absenceService.update).toHaveBeenCalledWith(absence);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackProfesseurById', () => {
      it('Should return tracked Professeur primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackProfesseurById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackInspecteurById', () => {
      it('Should return tracked Inspecteur primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackInspecteurById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackECById', () => {
      it('Should return tracked EC primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackECById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackEtudiantById', () => {
      it('Should return tracked Etudiant primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEtudiantById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
