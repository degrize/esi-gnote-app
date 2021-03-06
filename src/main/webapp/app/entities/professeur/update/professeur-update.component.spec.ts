import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProfesseurService } from '../service/professeur.service';
import { IProfesseur, Professeur } from '../professeur.model';
import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';
import { IClasse } from 'app/entities/classe/classe.model';
import { ClasseService } from 'app/entities/classe/service/classe.service';
import { IEC } from 'app/entities/ec/ec.model';
import { ECService } from 'app/entities/ec/service/ec.service';

import { ProfesseurUpdateComponent } from './professeur-update.component';

describe('Professeur Management Update Component', () => {
  let comp: ProfesseurUpdateComponent;
  let fixture: ComponentFixture<ProfesseurUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let professeurService: ProfesseurService;
  let etudiantService: EtudiantService;
  let classeService: ClasseService;
  let eCService: ECService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProfesseurUpdateComponent],
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
      .overrideTemplate(ProfesseurUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProfesseurUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    professeurService = TestBed.inject(ProfesseurService);
    etudiantService = TestBed.inject(EtudiantService);
    classeService = TestBed.inject(ClasseService);
    eCService = TestBed.inject(ECService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Etudiant query and add missing value', () => {
      const professeur: IProfesseur = { id: 456 };
      const etudiants: IEtudiant[] = [{ id: 11923 }];
      professeur.etudiants = etudiants;

      const etudiantCollection: IEtudiant[] = [{ id: 7660 }];
      jest.spyOn(etudiantService, 'query').mockReturnValue(of(new HttpResponse({ body: etudiantCollection })));
      const additionalEtudiants = [...etudiants];
      const expectedCollection: IEtudiant[] = [...additionalEtudiants, ...etudiantCollection];
      jest.spyOn(etudiantService, 'addEtudiantToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ professeur });
      comp.ngOnInit();

      expect(etudiantService.query).toHaveBeenCalled();
      expect(etudiantService.addEtudiantToCollectionIfMissing).toHaveBeenCalledWith(etudiantCollection, ...additionalEtudiants);
      expect(comp.etudiantsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Classe query and add missing value', () => {
      const professeur: IProfesseur = { id: 456 };
      const classes: IClasse[] = [{ id: 32504 }];
      professeur.classes = classes;

      const classeCollection: IClasse[] = [{ id: 32311 }];
      jest.spyOn(classeService, 'query').mockReturnValue(of(new HttpResponse({ body: classeCollection })));
      const additionalClasses = [...classes];
      const expectedCollection: IClasse[] = [...additionalClasses, ...classeCollection];
      jest.spyOn(classeService, 'addClasseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ professeur });
      comp.ngOnInit();

      expect(classeService.query).toHaveBeenCalled();
      expect(classeService.addClasseToCollectionIfMissing).toHaveBeenCalledWith(classeCollection, ...additionalClasses);
      expect(comp.classesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call EC query and add missing value', () => {
      const professeur: IProfesseur = { id: 456 };
      const eCS: IEC[] = [{ id: 3790 }];
      professeur.eCS = eCS;

      const eCCollection: IEC[] = [{ id: 73883 }];
      jest.spyOn(eCService, 'query').mockReturnValue(of(new HttpResponse({ body: eCCollection })));
      const additionalECS = [...eCS];
      const expectedCollection: IEC[] = [...additionalECS, ...eCCollection];
      jest.spyOn(eCService, 'addECToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ professeur });
      comp.ngOnInit();

      expect(eCService.query).toHaveBeenCalled();
      expect(eCService.addECToCollectionIfMissing).toHaveBeenCalledWith(eCCollection, ...additionalECS);
      expect(comp.eCSSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const professeur: IProfesseur = { id: 456 };
      const etudiants: IEtudiant = { id: 25009 };
      professeur.etudiants = [etudiants];
      const classes: IClasse = { id: 10297 };
      professeur.classes = [classes];
      const eCS: IEC = { id: 82428 };
      professeur.eCS = [eCS];

      activatedRoute.data = of({ professeur });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(professeur));
      expect(comp.etudiantsSharedCollection).toContain(etudiants);
      expect(comp.classesSharedCollection).toContain(classes);
      expect(comp.eCSSharedCollection).toContain(eCS);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Professeur>>();
      const professeur = { id: 123 };
      jest.spyOn(professeurService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ professeur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: professeur }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(professeurService.update).toHaveBeenCalledWith(professeur);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Professeur>>();
      const professeur = new Professeur();
      jest.spyOn(professeurService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ professeur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: professeur }));
      saveSubject.complete();

      // THEN
      expect(professeurService.create).toHaveBeenCalledWith(professeur);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Professeur>>();
      const professeur = { id: 123 };
      jest.spyOn(professeurService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ professeur });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(professeurService.update).toHaveBeenCalledWith(professeur);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackEtudiantById', () => {
      it('Should return tracked Etudiant primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEtudiantById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackClasseById', () => {
      it('Should return tracked Classe primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackClasseById(0, entity);
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
  });

  describe('Getting selected relationships', () => {
    describe('getSelectedEtudiant', () => {
      it('Should return option if no Etudiant is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedEtudiant(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Etudiant for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedEtudiant(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Etudiant is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedEtudiant(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedClasse', () => {
      it('Should return option if no Classe is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedClasse(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected Classe for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedClasse(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this Classe is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedClasse(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });

    describe('getSelectedEC', () => {
      it('Should return option if no EC is selected', () => {
        const option = { id: 123 };
        const result = comp.getSelectedEC(option);
        expect(result === option).toEqual(true);
      });

      it('Should return selected EC for according option', () => {
        const option = { id: 123 };
        const selected = { id: 123 };
        const selected2 = { id: 456 };
        const result = comp.getSelectedEC(option, [selected2, selected]);
        expect(result === selected).toEqual(true);
        expect(result === selected2).toEqual(false);
        expect(result === option).toEqual(false);
      });

      it('Should return option if this EC is not selected', () => {
        const option = { id: 123 };
        const selected = { id: 456 };
        const result = comp.getSelectedEC(option, [selected]);
        expect(result === option).toEqual(true);
        expect(result === selected).toEqual(false);
      });
    });
  });
});
